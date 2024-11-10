package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.response.CartResponse;
import com.haianh123bg.elearn_programming.dto.response.CartsResponse;

import java.util.List;

public interface CartService {
    CartsResponse getProductsInCartOfUser();

    void addCourseToCart(Integer courseId);

    void deleteCourseToCart(Integer courseId);
}
