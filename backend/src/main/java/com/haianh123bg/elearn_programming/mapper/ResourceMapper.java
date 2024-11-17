package com.haianh123bg.elearn_programming.mapper;

import com.haianh123bg.elearn_programming.dto.request.ResourceRequest;
import com.haianh123bg.elearn_programming.dto.response.ResourceResponse;
import com.haianh123bg.elearn_programming.entity.Resource;
import com.haianh123bg.elearn_programming.entity.Teacher;

public class ResourceMapper {
    public static Resource resourceRequestToResource(Teacher teacher, ResourceRequest request) {
        return Resource.builder()
                .teacher(teacher)
                .tag(request.getTag())
                .name(request.getName())
                .url(request.getUrl())
                .type(request.getType().name())
                .build();
    }

    public static ResourceResponse resourceToResourceResponse(Resource request) {
        return ResourceResponse.builder()
                .id(request.getId())
                .tag(request.getTag())
                .name(request.getName())
                .url(request.getUrl())
                .type(request.getType())
                .build();
    }
}
