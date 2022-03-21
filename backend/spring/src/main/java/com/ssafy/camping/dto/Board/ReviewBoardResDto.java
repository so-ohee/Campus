package com.ssafy.camping.dto.Board;

import com.ssafy.camping.dto.FileDto;
import com.ssafy.camping.entity.Rating;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@ApiModel(value = "ReviewBoardResDto : 게시글 조회")
public class ReviewBoardResDto {
    @ApiModelProperty(value = "게시글 고유 번호")
    private int boardId;
    @ApiModelProperty(value = "작성자 고유 번호")
    private String userUid;
    @ApiModelProperty(value = "작성자 이름")
    private String name;
    @ApiModelProperty(value = "작성자 프로필 사진")
    private String profile;
    @ApiModelProperty(value = "카테고리")
    private String category;
    @ApiModelProperty(value = "캠핑장 고유 번호")
    private Integer campingId;
    @ApiModelProperty(value = "캠핑장 명")
    private String facltNm;
    @ApiModelProperty(value = "평점 - 환경")
    private int environment;
    @ApiModelProperty(value = "평점 - 시설")
    private int facility;
    @ApiModelProperty(value = "평점 - 서비스")
    private int service;
    @ApiModelProperty(value = "제목")
    private String title;
    @ApiModelProperty(value = "파일")
    private List<FileDto> files;
    @ApiModelProperty(value = "내용")
    private String content;
    @ApiModelProperty(value = "작성일")
    private String createTime;
    @ApiModelProperty(value = "수정일")
    private String updateTime;
    @ApiModelProperty(value = "조회수")
    private int hit;
}
