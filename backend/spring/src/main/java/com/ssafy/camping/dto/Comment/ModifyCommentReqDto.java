package com.ssafy.camping.dto.Comment;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@ApiModel(value = "ModifyCommentReqDto : 댓글 등록")
public class ModifyCommentReqDto {
    @ApiModelProperty(value = "댓글 고유 번호")
    @NotNull
    private Integer commentId;
    @ApiModelProperty(value = "내용")
    @NotBlank
    private String comment;
}
