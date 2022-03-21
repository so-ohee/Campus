package com.ssafy.camping.dto.Comment;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel(value = "CommentResDto : 댓글 목록")
public class CommentResDto {
    @ApiModelProperty(value = "댓글 고유 번호")
    private int commentId;
    @ApiModelProperty(value = "작성자 고유 번호")
    private String userUid;
    @ApiModelProperty(value = "작성자 이름")
    private String name;
    @ApiModelProperty(value = "작성자 프로필 사진")
    private String profile;
    @ApiModelProperty(value = "내용")
    private String comment;
    @ApiModelProperty(value = "작성일")
    private String createTime;
    @ApiModelProperty(value = "수정일")
    private String updateTime;
}
