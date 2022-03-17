package com.ssafy.camping.dto.Board;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@ApiModel(value = "RegisterBoardReqDto : 게시글 등록")
public class RegisterBoardReqDto {
    @ApiModelProperty(value = "작성자 고유 번호")
    @NotBlank
    private String userUid;
    @ApiModelProperty(value = "카테고리", example = "후기, 질문, 자유")
    @NotBlank
    private String category;
    @ApiModelProperty(value = "제목")
    @NotBlank
    private String title;
    @ApiModelProperty(value = "내용")
    @NotBlank
    private String content;
    @ApiModelProperty(value = "캠핑장 고유 번호", required = false)
    private Integer campingId;
    @ApiModelProperty(value = "평점 - 환경", required = false)
    private Integer environment;
    @ApiModelProperty(value = "평점 - 시설", required = false)
    private Integer facility;
    @ApiModelProperty(value = "평점 - 서비스", required = false)
    private Integer service;
}
