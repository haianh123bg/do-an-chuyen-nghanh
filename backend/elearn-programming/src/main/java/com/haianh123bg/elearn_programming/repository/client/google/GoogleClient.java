package com.haianh123bg.elearn_programming.repository.client.google;

import com.haianh123bg.elearn_programming.dto.client.google.GoogleExchangeToken;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "google-exchange-code-to-token", url = "https://oauth2.googleapis.com")
public interface GoogleClient {

    @PostMapping(value = "/token", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    GoogleExchangeToken exchangeToken(
            @RequestParam("client_id") String clientId,
            @RequestParam("redirect_uri") String redirectUri,
            @RequestParam("client_secret") String clientSecret,
            @RequestParam("code") String code,
            @RequestParam("grant_type") String grantType
    );

    @GetMapping("tokeninfo")
    Object getTokenInfo(@RequestParam("access_token") String accessToken);
}
