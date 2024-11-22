package com.haianh123bg.elearn_programming.controller.user;

import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.CartsResponse;
import com.haianh123bg.elearn_programming.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Giỏ hàng", description = "Thêm, xóa giỏ hàng")
@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @Operation(summary = "Lấy thông tin giỏ hàng")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1003", description = "Account does not exist", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1031", description = "No courses in the cart", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1033", description = "There are no courses in your cart", content = @Content),
           
    

    })
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ApiResponse<CartsResponse> getCarts() {

        return ApiResponse.<CartsResponse>builder()
                .code(200)
                .result(cartService.getProductsInCartOfUser())
                .build();
    }

    @Operation(summary = "Thêm khóa học vào giỏ hàng")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
    })
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/{course_id}")
    public ApiResponse<String> addCourseToCart(
            @PathVariable(value = "course_id") Integer courseId
    ) {
        cartService.addCourseToCart(courseId);
        return ApiResponse.<String>builder()
                .code(201)
                .message("Course added to cart successfully")
                .build();
    }

    @Operation(summary = "Thêm xóa khóa học khỏi giỏ hàng")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1034", description = "Failed to delete the course from the cart", content = @Content),

    })
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{course_id}")
    public ApiResponse<String> deleteCourseToCart(
            @PathVariable(value = "course_id") Integer courseId
    ) {
        cartService.deleteCourseToCart(courseId);
        return ApiResponse.<String>builder()
                .code(200)
                .message("Course added to cart successfully")
                .build();
    }
}
