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

    @ApiModelProperty(value = "캠핑 유형", example = "일반야영장, 자동차야영장")
    List<String> induty;

    @ApiModelProperty(value = "선호 환경", example = "")
    List<String> lctCl;

    @ApiModelProperty(value = "거주지역")
    private String doNm;

    @ApiModelProperty(value = "바닥형태", example = "")
    List<String> siteBottomCl;

    @ApiModelProperty(value = "편의시설", example = "")
    List<String> sbrsCl;

    @ApiModelProperty(value = "반려견 동반 여부", example = "")
    List<String> animalCmgCl;
}