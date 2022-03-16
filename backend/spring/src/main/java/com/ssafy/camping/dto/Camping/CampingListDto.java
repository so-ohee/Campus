package com.ssafy.camping.dto.Camping;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel(value = "CampingListDto : 캠핑장 리스트 ")
public class CampingListDto {

    @ApiModelProperty(value = "캠핑장 고유번호")
    private int campingId;

    @ApiModelProperty(value = "대표이미지")
    private String firstImageUrl;

    @ApiModelProperty(value = "야영장명")
    private String facltNm;

    @ApiModelProperty(value = "주소")
    private String addr1;

    @ApiModelProperty(value = "업종")
    private String induty;

    @ApiModelProperty(value = "입지구분")
    private String lctCl;

    @ApiModelProperty(value = "테마환경")
    private String themaEnvrnCl;
}