package com.ssafy.camping.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONObject;

@Getter
@Setter
@ApiModel(value = "ItemDto : 쇼핑 조회")
public class ItemDto {
    @ApiModelProperty(value = "제목")
    private String title;
    @ApiModelProperty(value = "링크")
    private String link;
    @ApiModelProperty(value = "이미지")
    private String image;
    @ApiModelProperty(value = "가격")
    private int price;

    public ItemDto(JSONObject itemJson) {
        this.title = (String) itemJson.get("title");
        this.link = (String) itemJson.get("link");
        this.image = (String) itemJson.get("image");
        this.price = Integer.parseInt((String) itemJson.get("lprice"));
    }
}
