package com.ssafy.camping.dto.Board;

import com.ssafy.camping.dto.FileDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@ApiModel(value = "BoardResDto : 게시글 조회")
public class BoardResDto {
    @ApiModelProperty(value = "게시글 고유 번호")
    private int boardId;
    @ApiModelProperty(value = "작성자 고유 번호")
    private String userUid;
    @ApiModelProperty(value = "카테고리")
    private String category;
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
