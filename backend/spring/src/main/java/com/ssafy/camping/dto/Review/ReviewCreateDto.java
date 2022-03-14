package com.ssafy.camping.dto.Review;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(value = "ReviewCreateDto : 캠핑장 후기 등록")
public class ReviewCreateDto {
    @ApiModelProperty(value = "작성자 고유 번호")
    @NotBlank
    private String userUid;
    @ApiModelProperty(value = "캠핑장 고유 번호")
    @NotBlank
    private Integer campingId;
    @ApiModelProperty(value = "제목")
    @NotBlank
    private String title;
    @ApiModelProperty(value = "내용")
    @NotBlank
    private String content;
    @ApiModelProperty(value = "평점 - 환경")
    @NotBlank
    private int environment;
    @ApiModelProperty(value = "평점 - 시설")
    @NotBlank
    private int facility;
    @ApiModelProperty(value = "평점 - 서비스")
    @NotBlank
    private int service;
}
