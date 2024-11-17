package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.request.PaymentRequest;
import com.haianh123bg.elearn_programming.dto.response.PaymentResponse;
import com.haianh123bg.elearn_programming.entity.*;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.repository.*;
import com.haianh123bg.elearn_programming.service.PaymentService;
import com.haianh123bg.elearn_programming.utils.DiscountTypeEnum;
import com.haianh123bg.elearn_programming.utils.DiscountUtils;
import com.haianh123bg.elearn_programming.utils.OrderStatusEnum;
import com.haianh123bg.elearn_programming.utils.SepayUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final UserHasDiscountRepository userHasDiscountRepository;
    private final OrderRepository orderRepository;
    private final OrderLineRepository orderLineRepository;
    private final SepayUtils sepayUtils;

    @Override
    public PaymentResponse createPayment(PaymentRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());

        User user = userRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHORIZED)
        );

        List<Integer> list = request.getCourse().stream().map(
                PaymentRequest.CourseRequest::getCourseId
        ).toList();

        List<Course> courses = courseRepository.findByIds(list);

        double totalPrice = courses.stream().mapToDouble(Course::getPriceReal).sum();
        double amountDiscount = 0.0;

        UserHasDiscount userHasDiscount = null;
        if (request.getDiscountId() != null) {
            userHasDiscount = userHasDiscountRepository.findByDiscountIdNotExpired(request.getDiscountId()).orElseThrow(
                    () -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND)
            );
        }

        Discount discount = null;
        if (userHasDiscount != null) {
            discount = userHasDiscount.getDiscount();
            DiscountUtils.isValidDiscount(discount, totalPrice);
            if (discount.getType() != null && discount.getType().equals(DiscountTypeEnum.PERCENT.name())) {
                amountDiscount = totalPrice * discount.getPercent() / 100.0;
                if (amountDiscount > discount.getUpperLimit()) {
                    amountDiscount = discount.getUpperLimit();
                }
            } else {
                amountDiscount = discount.getValue();
            }
        }


        double total = totalPrice - amountDiscount;


        assert discount != null;
        Order order = Order.builder()
                .user(user)
                .price(totalPrice)
                .total(total)
                .createdAt(LocalDateTime.now())
                .discount(discount.getId())
                .amountDiscount(amountDiscount)
                .status(OrderStatusEnum.PENDING.name())
                .build();

        Order orderCreated = orderRepository.save(order);

        List<OrderLine> orderLines = courses.stream().map(
                (course) -> OrderLine.builder()
                        .order(orderCreated)
                        .amount(course.getPrice())
                        .amountDiscount(course.getPrice() - course.getPriceReal())
                        .total(course.getPriceReal())
                        .course(course)
                        .build()
        ).toList();

        orderLineRepository.saveAll(orderLines);

        // Tạo QRCode
        String qrCode = sepayUtils.qrCode(order.getId(), order.getTotal().toString());
        return PaymentResponse.builder()
                .qrCode(qrCode)
                .accountName(sepayUtils.getAccountName())
                .accountNumber(sepayUtils.getAccountNumber())
                .bankCode(sepayUtils.getBankCode())
                .description(sepayUtils.getDescriptionPayment(order.getId()))
                .bankIcon(sepayUtils.getBankIcon())
                .build();
    }
}
