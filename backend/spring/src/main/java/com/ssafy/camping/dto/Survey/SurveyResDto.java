package com.ssafy.camping.dto.Survey;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Builder
@ApiModel(value = "SurveyResDto : 설문 조회")
public class SurveyResDto {

    @ApiModelProperty(value = "장비 여부")
    Byte q1Equipment;

    @ApiModelProperty(value = "거리 설정")
    Byte q2Distance;

    @ApiModelProperty(value = "선호 환경")
    String q3Environment;

    @ApiModelProperty(value = "애완동물 여부")
    Byte q4Pet;

    @ApiModelProperty(value = "사용자 x좌표")
    double userX;

    @ApiModelProperty(value = "사용자 y좌표")
    double userY;
}