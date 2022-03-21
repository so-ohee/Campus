package com.ssafy.camping.dto.Comment;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@ApiModel(value = "CommentReqDto : 댓글 등록")
public class CommentReqDto {
    @ApiModelProperty(value = "게시글 고유 번호")
    @NotNull
    private Integer boardId;
    @ApiModelProperty(value = "작성자 고유 번호")
    @NotBlank
    private String userUid;
    @ApiModelProperty(value = "내용")
    @NotBlank
    private String comment;
}
