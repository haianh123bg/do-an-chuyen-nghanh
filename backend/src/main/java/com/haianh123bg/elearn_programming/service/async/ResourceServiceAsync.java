package com.haianh123bg.elearn_programming.service.async;

import com.haianh123bg.elearn_programming.entity.Resource;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.repository.ResourceRepository;
import com.haianh123bg.elearn_programming.service.other.CloudFlareR2Service;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResourceServiceAsync {


    private final ResourceRepository resourceRepository;
    private final CloudFlareR2Service cloudFlareR2Service;

    @Async
    public void deleteResourceInCloud (List<Long> resourceIds) {
        List<Resource> resources = resourceRepository.findAllById(resourceIds);

        resources.forEach(
                (resource) -> {
                    String url = resource.getUrl();
                    cloudFlareR2Service.deleteImage(url);
                }
        );
    }
}
