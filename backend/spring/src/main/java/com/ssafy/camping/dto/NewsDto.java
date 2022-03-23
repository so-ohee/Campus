package com.ssafy.camping.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "NewsDto : 뉴스 조회")
public class NewsDto {
	@ApiModelProperty(value = "제목")
	private String title;
	@ApiModelProperty(value = "링크")
	private String link;
	@ApiModelProperty(value = "내용")
	private String description;
	@ApiModelProperty(value = "작성일")
	private String date;
}
