package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.client.sepay.SepayIpnRequest;
import com.haianh123bg.elearn_programming.dto.request.PaymentRequest;
import com.haianh123bg.elearn_programming.dto.response.PaymentResponse;
import com.haianh123bg.elearn_programming.dto.response.WebhooksResponse;
import com.haianh123bg.elearn_programming.entity.*;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.repository.*;
import com.haianh123bg.elearn_programming.service.PaymentService;
import com.haianh123bg.elearn_programming.service.RedisService;
import com.haianh123bg.elearn_programming.utils.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class PaymentServiceImpl implements PaymentService {

    CourseRepository courseRepository;
    UserRepository userRepository;
    UserHasDiscountRepository userHasDiscountRepository;
    OrderRepository orderRepository;
    OrderLineRepository orderLineRepository;
    SepayUtils sepayUtils;
    RedisService redisService;
    private final UserHasCourseRepository userHasCourseRepository;

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

    @Override
    public ResponseEntity<?> ipn(HttpServletRequest request, SepayIpnRequest webhooksRequest) {
        if (!isValidToken(request)) return ResponseEntity.badRequest().body("INVALID");

        Integer orderId = Integer.valueOf(webhooksRequest.getContent().replaceAll("\\D", ""));
        Optional<Order> orderOptional = orderRepository.findById(orderId);

        if (orderOptional.isEmpty() || !isOrderPending(orderOptional.get())) {
            return ResponseEntity.badRequest().body(WebhooksResponse.builder()
                    .success(false)
                    .build());
        }

        Order order = orderOptional.get();
        if ("in".equals(webhooksRequest.getTransferType()) && isValidAmount(webhooksRequest.getTransferAmount(), order.getTotal())) {
            order.setVndRef(webhooksRequest.getId().toString());
            processOrderStatus(order);
            processUserAndCourse(order);

            redisService.saveDataWithTTL("SEPAY_" + order.getId(), "SUCCESS", 5, TimeUnit.MINUTES);

            return ResponseEntity.ok().body(WebhooksResponse.builder()
                    .success(true)
                    .build());
        }

        return ResponseEntity.badRequest().body(WebhooksResponse.builder()
                .success(false)
                .build());
    }

    private void processUserAndCourse(Order order) {
        List<OrderLine> lines = order.getOrderLines();
        User user = order.getUser();
        lines.forEach((line) -> {
            Course course = line.getCourse();

            UserHasCourse userHasCourse = UserHasCourse.builder()
                    .course(course)
                    .user(user)
                    .buyDate(LocalDateTime.now())
                    .expiredTime(LocalDateTime.now())
                    .isUsed(true)
                    .progress(0)
                    .build();

            userHasCourseRepository.save(userHasCourse);

            if (user.getTotalBuyer() != null && user.getTotalBuyer() >= 0) {
                user.setTotalBuyer(user.getTotalBuyer() + 1);
            } else {
                user.setTotalBuyer(1L);
            }

            if (course.getTotalBuyer() != null && course.getTotalBuyer() >= 0) {
                course.setTotalBuyer(course.getTotalBuyer() + 1);
            } else {
                course.setTotalBuyer(1L);
            }

            if (course.getTotalRevenue() != null && course.getTotalRevenue() >= 0) {
                course.setTotalRevenue(course.getTotalRevenue() + line.getTotal());
            } else {
                course.setTotalRevenue(line.getTotal());
            }
        });
        userRepository.save(user);
    }

    private boolean isValidToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        return header != null && header.startsWith("Apikey ");
    }

    private boolean isOrderPending(Order order) {
        return PaymentStatusEnum.PENDING.name().equals(order.getStatus());
    }

    private boolean isValidAmount(Double transferAmount, Double total) {
        return transferAmount != null && transferAmount > 0 && Math.abs(transferAmount - total) <= 5000;
    }

    private void processOrderStatus(Order order) {
        order.setStatus(PaymentStatusEnum.SUCCESS.name());
        orderRepository.save(order);
    }
}
