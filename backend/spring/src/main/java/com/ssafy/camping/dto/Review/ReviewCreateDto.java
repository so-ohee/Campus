package com.ssafy.camping.dto.Review;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(value = "ReviewCreateDto : 캠핑장 후기 등록")
public class ReviewCreateDto {
    @ApiModelProperty(value = "작성자 고유 번호")
    private String userUid;
    @ApiModelProperty(value = "캠핑장 고유 번호")
    private Integer campingId;
    @ApiModelProperty(value = "제목")
    private String title;
    @ApiModelProperty(value = "내용")
    private String content;
    @ApiModelProperty(value = "평점 - 환경")
    private int environment;
    @ApiModelProperty(value = "평점 - 시설")
    private int facility;
    @ApiModelProperty(value = "평점 - 서비스")
    private int service;

//    @Builder
//    public ReviewCreateDto(String userUid, Integer campingId, String title, String content) {
//        this.userUid = userUid;
//        this.campingId = campingId;
//        this.title = title;
//        this.content = content;
//    }
}
