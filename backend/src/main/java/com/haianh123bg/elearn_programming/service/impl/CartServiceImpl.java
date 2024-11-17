package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.response.CartResponse;
import com.haianh123bg.elearn_programming.dto.response.CartsResponse;
import com.haianh123bg.elearn_programming.entity.Cart;
import com.haianh123bg.elearn_programming.entity.CartDetail;
import com.haianh123bg.elearn_programming.entity.Course;
import com.haianh123bg.elearn_programming.entity.User;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.repository.CartDetailRepository;
import com.haianh123bg.elearn_programming.repository.CartRepository;
import com.haianh123bg.elearn_programming.repository.CourseRepository;
import com.haianh123bg.elearn_programming.repository.UserRepository;
import com.haianh123bg.elearn_programming.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final CartDetailRepository cartDetailRepository;

    @Override
    public CartsResponse getProductsInCartOfUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );

        Cart cart = user.getCart();

        if (cart == null) {
            cart = Cart.builder()
                    .user(user)
                    .build();
            cartRepository.save(cart);
            throw new AppException(ErrorCode.CART_EMPTY);
        }

        try {
            List<CartDetail> cartDetails = cart.getCartDetails();
            if (cartDetails == null || cartDetails.isEmpty()) {
                throw new AppException(ErrorCode.CART_EMPTY);
            }

            Double discountedPrice = 0.0;
            Double totalRetailPrice = 0.0;

            List<CartResponse> response = new ArrayList<>();
            for (CartDetail cartDetail : cartDetails) {
                Course course = cartDetail.getCourse();

                // Cộng dồn giá trị cho tổng giá niêm yết và tổng giá khuyến mãi
                totalRetailPrice += course.getPrice();
                discountedPrice += course.getPriceReal();

                // Tạo CartResponse cho từng mục trong giỏ hàng
                response.add(CartResponse.builder()
                        .courseImageUrl(course.getImageUrl())
                        .courseId(course.getCourseId())
                        .courseName(course.getName())
                        .retailPrice(course.getPrice())
                        .discountedPrice(course.getPriceReal())
                        .build());
            }

            return CartsResponse.builder()
                    .courses(response)
                    .totalDiscountedPrice(discountedPrice)
                    .totalRetailPrice(totalRetailPrice)
                    .build();
        } catch (Exception e) {
            throw new AppException(ErrorCode.CART_EMPTY);
        }
    }

    @Override
    public void addCourseToCart(
            Integer courseId
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );

        Course course = courseRepository.findById(courseId).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_FOUND)
        );

        Cart cart = user.getCart();

        if (cart == null) {
            cart = Cart.builder()
                    .user(user)
                    .build();
            cart = cartRepository.save(cart);
        }

        if (cart.getTotalCourse() == null || cart.getTotalCourse() < 0) {
            cart.setTotalCourse(1);
        } else {
            cart.setTotalCourse(cart.getTotalCourse() + 1);
        }

        if (cart.getTotalCourse() == null || cart.getTotalCourse() < 0) {
            cart.setTotalCourse(1);
        } else {
            cart.setTotalCourse(cart.getTotalCourse() + 1);
        }

        if (cart.getTotalPrice() == null || (cart.getTotalPrice() < 0)) {
            cart.setTotalPrice(course.getPrice());
        } else {
            cart.setTotalPrice(cart.getTotalPrice() + course.getPrice());
        }

        if (cart.getTotalRealPrice() == null || (cart.getTotalRealPrice() < 0)) {
            cart.setTotalPrice(cart.getTotalRealPrice());
        } else {
            cart.setTotalRealPrice(cart.getTotalRealPrice() + course.getPriceReal());
        }

        cartRepository.save(cart);

        CartDetail cartDetail = CartDetail.builder()
                .cart(cart)
                .course(course)
                .build();

        cartDetailRepository.save(cartDetail);
    }

    @Override
    public void deleteCourseToCart(Integer courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());

        User user = userRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHORIZED)
        );

        Cart cart = user.getCart();

        if (cart == null) {
            cart = Cart.builder()
                    .user(user)
                    .build();
            cart = cartRepository.save(cart);
        }

        CartDetail cartDetail = cartDetailRepository.findByCartIdAndCourseId(cart.getCartId(), courseId).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_IN_CART)
        );

        try {
            cartDetailRepository.delete(cartDetail);
        } catch (Exception e) {
            throw new AppException(ErrorCode.ERROR_DELETE_CART);
        }
    }
}
