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

    @ApiModelProperty(value = "캠핑 유형")
    List<String> induty;

    @ApiModelProperty(value = "선호 환경")
    List<String> lctCl;

    @ApiModelProperty(value = "거주지역")
    private String doNm;

    @ApiModelProperty(value = "바닥형태")
    List<String> siteBottomCl;

    @ApiModelProperty(value = "편의시설")
    List<String> sbrsCl;

    @ApiModelProperty(value = "반려견 동반 여부")
    List<String> animalCmgCl;
}