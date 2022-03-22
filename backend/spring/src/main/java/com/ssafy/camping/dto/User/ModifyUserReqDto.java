package com.ssafy.camping.dto.User;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ModifyUserReqDto {
    @ApiModelProperty(value = "회원 고유 번호")
    @NotBlank(message = "userUid는 빈 값이 올 수 없습니다.")
    private String userUid;
    @ApiModelProperty(value = "회원 이름")
    @NotBlank(message = "name은 빈 값이 올 수 없습니다.")
    private String name;
}
