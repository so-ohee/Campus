package com.ssafy.camping.dto.Notice;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(value = "NoticeReqDto : 게시판 등록")
public class NoticeReqDto {
    @ApiModelProperty(value = "작성자 고유 번호")
    @NotBlank
    private String userUid;
    @ApiModelProperty(value = "카테고리")
    @NotBlank
    private String category;
    @ApiModelProperty(value = "제목")
    @NotBlank
    private String title;
    @ApiModelProperty(value = "내용")
    @NotBlank
    private String content;
}
