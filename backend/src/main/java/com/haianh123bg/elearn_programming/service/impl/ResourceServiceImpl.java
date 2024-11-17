package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.request.ResourceRequest;
import com.haianh123bg.elearn_programming.dto.response.ResourceResponse;
import com.haianh123bg.elearn_programming.entity.Resource;
import com.haianh123bg.elearn_programming.entity.Teacher;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.mapper.ResourceMapper;
import com.haianh123bg.elearn_programming.repository.ResourceRepository;
import com.haianh123bg.elearn_programming.repository.TeacherRepository;
import com.haianh123bg.elearn_programming.service.ResourceService;
import com.haianh123bg.elearn_programming.service.other.CloudFlareR2Service;
import com.haianh123bg.elearn_programming.utils.PrefixFolderEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {
    private final ResourceRepository resourceRepository;
    private final CloudFlareR2Service cloudFlareR2Service;
    private final TeacherRepository teacherRepository;

    @Override
    public ResourceResponse uploadResource(
            ResourceRequest request,
            MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());
        Teacher teacher = teacherRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHORIZED)
        );

        if (file != null) {
            String url = cloudFlareR2Service.saveFileWithPrefixFolder(PrefixFolderEnum.RESOURCE_TEACHER.getPrefix(), file);
            request.setUrl(url);
        }

        Resource resource = ResourceMapper.resourceRequestToResource(teacher, request);
        Resource resourceCreated = resourceRepository.save(resource);

        return ResourceMapper.resourceToResourceResponse(resourceCreated);
    }

    @Override
    public void deleteResource(Long resourceId) {
        Resource resource = resourceRepository.findById(resourceId).orElseThrow(
                () -> new AppException(ErrorCode.RESOURCE_NOT_FOUND)
        );

        String url = resource.getUrl();

        // Tạo luồng xóa ảnh trên cloud
        cloudFlareR2Service.deleteImage(url);

        resourceRepository.delete(resource);
    }
}
