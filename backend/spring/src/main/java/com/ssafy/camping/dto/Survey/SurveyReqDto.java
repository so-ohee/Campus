package com.ssafy.camping.dto.Survey;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@ApiModel(value = "SurveyReqDto : 설문 등록")
public class SurveyReqDto {
    @ApiModelProperty(value = "작성자 고유 번호")
    @NotBlank
    private String userUid;

    @ApiModelProperty(value = "장비여부")
    Byte q1Equipment;

    @ApiModelProperty(value = "거리 설정")
    Byte q2Distance;

    @ApiModelProperty(value = "선호 환경")
    String q3Environment;

    @ApiModelProperty(value = "애완동물 여부")
    Byte q4Pet;

    @ApiModelProperty(value = "유저 X좌표")
    double userX;

    @ApiModelProperty(value = "유저 Y좌표")
    double userY;

}