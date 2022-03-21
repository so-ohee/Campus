package com.ssafy.camping.dto.User;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class UserReqDto {
    @ApiModelProperty(value = "회원 고유 번호")
    @NotBlank(message = "userUid는 빈 값이 올 수 없습니다.")
    private String userUid;
    @ApiModelProperty(value = "회원 이름")
    @NotBlank(message = "name은 빈 값이 올 수 없습니다.")
    private String name;
    @ApiModelProperty(value = "회원 프로필 사진 경로")
    private String profile;
}
