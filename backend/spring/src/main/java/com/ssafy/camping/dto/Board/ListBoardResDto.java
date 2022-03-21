package com.ssafy.camping.dto.Board;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel(value = "ListBoardResDto : 게시글 목록")
public class ListBoardResDto {
    @ApiModelProperty(value = "게시글 고유 번호")
    private int boardId;
    @ApiModelProperty(value = "작성자 고유 번호")
    private String userUid;
    @ApiModelProperty(value = "작성자 이름")
    private String name;
    @ApiModelProperty(value = "카테고리")
    private String category;
    @ApiModelProperty(value = "제목")
    private String title;
    @ApiModelProperty(value = "작성일")
    private String createTime;
    @ApiModelProperty(value = "조회수")
    private int hit;
}
