package com.ssafy.camping.entity;

import com.ssafy.camping.converter.SurveyDataConverter;
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

    @Convert(converter = SurveyDataConverter.class)
    @Column(columnDefinition = "json")
    private List<String> induty;

    @Convert(converter = SurveyDataConverter.class)
    @Column(columnDefinition = "json")
    private List<String> lctCl;

    private String doNm;

    @Convert(converter = SurveyDataConverter.class)
    @Column(columnDefinition = "json")
    private List<String> siteBottomCl;

    @Convert(converter = SurveyDataConverter.class)
    @Column(columnDefinition = "json")
    private List<String> sbrsCl;

    @Convert(converter = SurveyDataConverter.class)
    @Column(columnDefinition = "json")
    private List<String> animalCmgCl;

    @Builder
    public Survey(String userUid, List<String> induty, List<String> lctCl, String doNm,
                  List<String> siteBottomCl, List<String> sbrsCl, List<String> animalCmgCl){
        this.userUid = userUid;
        this.induty = induty;
        this.lctCl = lctCl;
        this.doNm = doNm;
        this.siteBottomCl = siteBottomCl;
        this.sbrsCl = sbrsCl;
        this.animalCmgCl = animalCmgCl;
    }
}
