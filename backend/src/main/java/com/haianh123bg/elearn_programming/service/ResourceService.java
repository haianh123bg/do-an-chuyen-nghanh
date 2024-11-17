package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.request.ResourceRequest;
import com.haianh123bg.elearn_programming.dto.response.ResourceResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ResourceService {
    ResourceResponse uploadResource(ResourceRequest request, MultipartFile file);

    void deleteResource(Long resourceId);
}
