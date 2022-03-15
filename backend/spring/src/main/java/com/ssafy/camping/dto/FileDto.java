package com.ssafy.camping.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "FileDto : 파일 조회")
public class FileDto {
    @ApiModelProperty(value = "파일 고유 번호")
    private Integer fileId;
    @ApiModelProperty(value = "파일 경로")
    private String filePath;
}
