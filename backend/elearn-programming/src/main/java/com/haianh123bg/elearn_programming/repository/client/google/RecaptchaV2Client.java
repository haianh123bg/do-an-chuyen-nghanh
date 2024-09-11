package com.haianh123bg.elearn_programming.repository.client.google;

import com.haianh123bg.elearn_programming.dto.client.google.RecaptchaV2;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "recaptcha-v2-verify", url = "https://www.google.com/recaptcha/api")
public interface RecaptchaV2Client {

    @PostMapping("/siteverify")
    RecaptchaV2 verifyRecaptcha(@RequestParam("secret") String secret,
                                @RequestParam("response") String response,
                                @RequestParam(value = "remoteip", required = false) String remoteip);
}