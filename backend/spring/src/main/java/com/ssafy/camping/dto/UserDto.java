package com.ssafy.camping.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class UserDto {
    @ApiModelProperty(value = "회원 고유 번호")
    @NotBlank
    private String userUid;
    @ApiModelProperty(value = "회원 이름")
    @NotBlank
    private String name;
    @ApiModelProperty(value = "회원 프로필 사진 경로")
    private String profile;
}
