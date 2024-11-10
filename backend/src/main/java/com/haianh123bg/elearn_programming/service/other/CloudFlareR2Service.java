package com.haianh123bg.elearn_programming.service.other;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CopyObjectRequest;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

/**
 * Service class for handling image uploads to Cloudflare R2.
 */
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

    public String saveImageToR2(MultipartFile photo, String fileName) {
        String r2LocationImage = null;

        try {
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

            r2LocationImage = r2DevBucketUrl +"/"+ fileName;
            return r2LocationImage;
        } catch (Exception e) {
            log.error("Cloudflare R2 Error: ", e);
            throw new AppException(ErrorCode.CLOUD_FLARE_ERROR_UPLOAD);
        }
    }

    @Async
    public void deleteImage(String url) {
        try {

            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(r2AccessKey, r2SecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(r2Endpoint, "auto")) // Sử dụng endpoint của R2
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .build();

            // Lấy phần "object key" từ URL
            String objectKey = url.substring(url.indexOf(".r2.dev/") + 8); // Tìm vị trí sau ".r2.dev/" và lấy phần còn lại
            DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucketName, objectKey);
            s3Client.deleteObject(deleteObjectRequest);
        }catch (Exception e) {
            log.error("Cloudflare R2 Error: ", e);
            throw new AppException(ErrorCode.CLOUD_FLARE_ERROR_DELETE);
        }
    }

    public String renameImage(String oldFileName, String newFileName) {
        try {

            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(r2AccessKey, r2SecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(r2Endpoint, "auto")) // Sử dụng endpoint của R2
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .build();

            if (!s3Client.doesObjectExist(bucketName, oldFileName)) throw new AppException(ErrorCode.FILE_NOT_EXISTS);

            CopyObjectRequest copyObjectRequest = new CopyObjectRequest(bucketName, oldFileName, bucketName, newFileName);
            s3Client.copyObject(copyObjectRequest);

            s3Client.deleteObject(bucketName, oldFileName);

            return r2DevBucketUrl +"/"+ copyObjectRequest.getDestinationKey();

        }catch (Exception e){
            log.error("Cloudflare R2 Error: ", e);
            throw new AppException(ErrorCode.CLOUD_FLARE_ERROR_UPLOAD);
        }
    }

    public String saveFileWithPrefixFolder(String folder, MultipartFile file) {
        String folderPath = folder + "/";
        String newFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String r2LocationFile = null;

        try {
            // Kết nối Cloudflare R2
            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(r2AccessKey, r2SecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(r2Endpoint, "auto"))
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .build();

            // Tải lên Cloudflare R2 trực tiếp từ MultipartFile
            InputStream inputStream = file.getInputStream();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, folderPath + newFileName, inputStream, metadata);
            s3Client.putObject(putObjectRequest);

            r2LocationFile = r2DevBucketUrl + "/" + folderPath + newFileName;
            return r2LocationFile;

        } catch (Exception e) {
            log.error("Cloudflare R2 Error: {}", e.getMessage(), e);
            throw new AppException(ErrorCode.CLOUD_FLARE_ERROR_UPLOAD);
        }
    }
}
