package com.ssafy.camping.dto.Board;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel(value = "ListCampsiteBoardResDto : 캠핑장 상세보기 - 후기 조회")
public class ListCampsiteBoardResDto {
    @ApiModelProperty(value = "게시글 고유 번호")
    private int boardId;
    @ApiModelProperty(value = "작성자 고유 번호")
    private String userUid;
    @ApiModelProperty(value = "작성자 이름")
    private String name;
    @ApiModelProperty(value = "작성자 프로필 사진")
    private String profile;
    @ApiModelProperty(value = "평점")
    private double rating;
    @ApiModelProperty(value = "제목")
    private String title;
    @ApiModelProperty(value = "작성일")
    private String createTime;
    @ApiModelProperty(value = "조회수")
    private int hit;
}
