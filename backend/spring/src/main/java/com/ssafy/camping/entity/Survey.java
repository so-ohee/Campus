package com.ssafy.camping.entity;

import com.ssafy.camping.converter.SurveyDataConverter;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Survey {
    @Id
    private String userUid;

    @ApiModelProperty(value = "장비여부")
    private Byte q1Equipment;

    @ApiModelProperty(value = "거리 설정")
    private Byte q2Distance;

    @ApiModelProperty(value = "선호 환경")
    private String q3Environment;

    @ApiModelProperty(value = "애완동물 여부")
    private Byte q4Pet;

    @ApiModelProperty(value = "사용자 X")
    private double userX;

    @ApiModelProperty(value = "사용자 Y")
    private double userY;

    @Builder
    public Survey(String userUid, Byte q1Equipment, Byte q2Distance, String q3Environment, Byte q4Pet, double userX, double userY){
        this.userUid = userUid;
        this.q1Equipment = q1Equipment;
        this.q2Distance = q2Distance;
        this.q3Environment = q3Environment;
        this.q4Pet = q4Pet;
        this.userX = userX;
        this.userY = userY;
    }
}
