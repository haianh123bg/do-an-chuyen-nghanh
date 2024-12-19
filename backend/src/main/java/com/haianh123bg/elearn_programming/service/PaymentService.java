package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.client.sepay.SepayIpnRequest;
import com.haianh123bg.elearn_programming.dto.request.PaymentRequest;
import com.haianh123bg.elearn_programming.dto.response.PaymentResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

public interface PaymentService {

    PaymentResponse createPayment(PaymentRequest request);

    ResponseEntity<?> ipn(HttpServletRequest request, SepayIpnRequest requestBody);
}
