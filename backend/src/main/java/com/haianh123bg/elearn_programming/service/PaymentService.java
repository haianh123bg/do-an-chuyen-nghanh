package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.request.PaymentRequest;
import com.haianh123bg.elearn_programming.dto.response.PaymentResponse;

public interface PaymentService {

    PaymentResponse createPayment(PaymentRequest request);
}
