package com.haianh123bg.elearn_programming.mapper_mapstruct;

import com.haianh123bg.elearn_programming.dto.request.UserInfoRequest;
import com.haianh123bg.elearn_programming.dto.response.UserInfoResponse;
import com.haianh123bg.elearn_programming.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapperMapstruct {
    @Mapping(target = "address", source = "address")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "date", source = "dateOfBirth")
    @Mapping(target = "gender", source = "gender")
    UserInfoResponse toUserInfoResponse(User user);

    @Mapping(target = "address", source = "address")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "dateOfBirth", source = "date")
    @Mapping(target = "gender", source = "gender")
    User toUser(UserInfoRequest request);
}
