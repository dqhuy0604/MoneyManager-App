
package com.example.moneymanager.service;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private final RestClient restClient;
    private final String apiKey;
    private final String fromEmail;

    public EmailService(
            @Value("${brevo.api.key}") String apiKey,
            @Value("${brevo.from.email}") String fromEmail
    ) {
        this.apiKey = apiKey;
        this.fromEmail = fromEmail;

        SimpleClientHttpRequestFactory factory =
                new SimpleClientHttpRequestFactory();

        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(30));

        this.restClient = RestClient.builder()
                .baseUrl("https://api.brevo.com/v3")
                .requestFactory(factory)
                .build();
    }

    // 1. Gửi email văn bản
    public void sendEmail(String to, String subject, String body) {

        Map<String, Object> requestBody = Map.of(
                "sender", Map.of(
                        "name", "Money Manager",
                        "email", fromEmail
                ),
                "to", List.of(Map.of("email", to)),
                "subject", subject,
                "textContent", body
        );

        sendRequest(requestBody);
    }

    // 2. Gửi email có file đính kèm
    public void sendEmailWithAttachment(
            String to,
            String subject,
            String body,
            byte[] attachment,
            String filename
    ) throws MessagingException {

        if (attachment == null || filename == null
                || filename.isBlank()) {
            throw new IllegalArgumentException(
                    "Attachment và filename không được để trống"
            );
        }

        String base64Content =
                Base64.getEncoder().encodeToString(attachment);
        Map<String, Object> requestBody = Map.of(
                "sender", Map.of(
                        "name", "Money Manager",
                        "email", fromEmail
                ),
                "to", List.of(Map.of("email", to)),
                "subject", subject,
                "textContent", body,
                "attachment", List.of(
                        Map.of(
                                "content", base64Content,
                                "name", filename
                        )
                )
        );

        sendRequest(requestBody);
    }
    private void sendRequest(Map<String, Object> requestBody) {

        restClient.post()
                .uri("/smtp/email")
                .header("api-key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .toBodilessEntity();
    }
}
