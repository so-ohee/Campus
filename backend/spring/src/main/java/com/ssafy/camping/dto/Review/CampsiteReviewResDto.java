package com.ssafy.camping.dto.Review;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel(value = "CampsiteReviewResDto : 캠핑장 후기 조회")
public class CampsiteReviewResDto {
    @ApiModelProperty(value = "후기 고유 번호")
    private int reviewId;
    @ApiModelProperty(value = "작성자 고유 번호")
    private String userUid;
    @ApiModelProperty(value = "평점")
    private double rating;
    @ApiModelProperty(value = "제목")
    private String title;
    @ApiModelProperty(value = "작성일")
    private String createTime;
    @ApiModelProperty(value = "조회수")
    private int hit;
}
