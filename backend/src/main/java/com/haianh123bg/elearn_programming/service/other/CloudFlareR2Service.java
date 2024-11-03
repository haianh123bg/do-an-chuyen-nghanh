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

/**
 * Service class for handling image uploads to Cloudflare R2.
 */
@Slf4j
@Service
public class CloudFlareR2Service {

    // The name of the S3 bucket where images are stored
    private final String bucketName = "chatbot";

    // Credentials and configuration values are injected from application properties
    @Value("${cf.r2.secret.key}")
    private String r2SecretKey;

    @Value("${cf.r2.access.key}")
    private String r2AccessKey;

    @Value("${cf.r2.endpoint}")
    private String r2Endpoint; // Cloudflare R2 endpoint

    @Value("${cf.r2.dev.bucket.url}")
    private String r2DevBucketUrl; // The base URL of the development bucket

    /**
     * Save an image to the Cloudflare R2 bucket.
     *
     * @param photo the image file to be uploaded
     * @return the URL of the uploaded image
     */
    public String saveImageToR2(MultipartFile photo) {
        String r2LocationImage = null;

        try {
            // Get the original filename from the uploaded file
            String fileName = photo.getOriginalFilename();

            // Create AWS credentials using access and secret keys
            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(r2AccessKey, r2SecretKey);

            // Create an S3 client with the specified Cloudflare R2 endpoint and credentials
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(r2Endpoint, "auto")) // R2 endpoint
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .build();

            // Retrieve the input stream from the uploaded file
            InputStream inputStream = photo.getInputStream();

            // Set metadata for the uploaded file including content type and size
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(photo.getContentType());
            metadata.setContentLength(photo.getSize()); // Set file size

            // Create a request to upload the file to the S3 bucket
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, inputStream, metadata);
            s3Client.putObject(putObjectRequest);

            // Generate and return the URL of the uploaded image in the R2 bucket
            r2LocationImage = r2DevBucketUrl + "/" + fileName;
            return r2LocationImage;
        } catch (Exception e) {
            // Log the error and throw a custom application exception in case of failure
            log.error("Cloudflare R2 Error: ", e);
            throw new AppException(ErrorCode.CLOUD_FLARE_ERROR_UPLOAD);
        }
    }
}
