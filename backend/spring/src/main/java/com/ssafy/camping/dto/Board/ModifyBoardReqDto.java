package com.ssafy.camping.dto.Board;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@ApiModel(value = "ModifyBoardReqDto : 게시글 수정")
public class ModifyBoardReqDto {
    @ApiModelProperty(value = "게시글 고유 번호")
    @NotNull
    private Integer boardId;
    @ApiModelProperty(value = "제목")
    @NotBlank
    private String title;
    @ApiModelProperty(value = "내용")
    @NotBlank
    private String content;
}
