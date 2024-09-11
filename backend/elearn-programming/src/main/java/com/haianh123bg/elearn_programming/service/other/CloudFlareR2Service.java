package com.haianh123bg.elearn_programming.service.other;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Slf4j
@Service
public class CloudFlareR2Service {
    private final String bucketName = "chatbot";

    @Value("${cf.r2.secret.key}")
    private String r2SecretKey;

    @Value("${cf.r2.access.key}")
    private String r2AccessKey;

    @Value("${cf.r2.endpoint}")
    private String r2Endpoint; // Thêm endpoint từ file cấu hình

    @Value("${cf.r2.dev.bucket.url}")
    private String r2DevBucketUrl;

    public String saveImageToR2(MultipartFile photo) {
        String r2LocationImage = null;

        try {
            String fileName = photo.getOriginalFilename();

            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(r2AccessKey, r2SecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(r2Endpoint, "auto")) // Sử dụng endpoint của R2
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .build();

            InputStream inputStream = photo.getInputStream();

            // Thiết lập metadata với Content-Length và Content-Type
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(photo.getContentType());
            metadata.setContentLength(photo.getSize()); // Thiết lập dung lượng của file

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, inputStream, metadata);
            s3Client.putObject(putObjectRequest);

            r2LocationImage = r2DevBucketUrl + "/" + fileName;
            return r2LocationImage;
        } catch (Exception e) {
            log.error("Cloudflare R2 Error: ", e);
            throw new AppException(ErrorCode.CLOUD_FLARE_ERROR_UPLOAD);
        }
    }
}
