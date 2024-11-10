package com.haianh123bg.elearn_programming.controller.user;

import com.haianh123bg.elearn_programming.dto.client.sepay.SepayIpnRequest;
import com.haianh123bg.elearn_programming.dto.request.PaymentRequest;
import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.PaymentResponse;
import com.haianh123bg.elearn_programming.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Thanh toán")
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @Operation(summary = "Thanh toán đơn hàng")
    @PostMapping("/create")
    public ApiResponse<PaymentResponse> create(
            @RequestBody PaymentRequest request
    ) {

        return ApiResponse.<PaymentResponse>builder()
                .code(200)
                .result(paymentService.createPayment(request))
                .build();
    }

    @Operation(summary = "Webhook Sepay")
    @PostMapping("/sepay/ipn")
    public ResponseEntity<?> sepayIpn(
            @RequestBody SepayIpnRequest requestBody,
            HttpServletRequest request
    ) {
        return null;
    }
}
