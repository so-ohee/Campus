package com.ssafy.camping.dto.Camping;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel(value = "CampingResDto : 캠핑장 정보")
public class CampingResDto {

    @ApiModelProperty(value = "캠핑장 고유번호")
    private int campingId;

    @ApiModelProperty(value = "야영장명")
    private String facltNm;

    @ApiModelProperty(value = "한줄소개")
    private String lineIntro;

    @ApiModelProperty(value = "소개")
    private String intro;

    @ApiModelProperty(value = "운영상태")
    private String manageStatus; //오타

    @ApiModelProperty(value = "휴장 시작일")
    private String hvofBgnde;

    @ApiModelProperty(value = "휴장 종료일")
    private String hvofEnddle;

    @ApiModelProperty(value = "업종")
    private String induty;

    @ApiModelProperty(value = "입지구분")
    private String lctCl;

    @ApiModelProperty(value = "도")
    private String doNm;

    @ApiModelProperty(value = "시군구")
    private String sigunguNm;

    @ApiModelProperty(value = "주소")
    private String addr1;

    @ApiModelProperty(value = "주소상세")
    private String addr2;

    @ApiModelProperty(value = "x")
    private double mapX;

    @ApiModelProperty(value = "y")
    private double mapY;

    @ApiModelProperty(value = "오시는 길")
    private String direction;

    @ApiModelProperty(value = "전화")
    private String tel;

    @ApiModelProperty(value = "홈페이지")
    private String homepage;

    @ApiModelProperty(value = "예약페이지")
    private String resveUrl;

    @ApiModelProperty(value = "예약구분")
    private String resveCl;

    @ApiModelProperty(value = "주요시설 일반야영장")
    private int gnrlSiteCo;

    @ApiModelProperty(value = "주요시설 자동차야영장")
    private int autoSiteCo;

    @ApiModelProperty(value = "주요시설 글램핑")
    private int glampSiteCo;

    @ApiModelProperty(value = "주요시설 카라반")
    private int caravSiteCo;

    @ApiModelProperty(value = "주요시설 개인 카라반")
    private int indvdlCaravSiteCo;

    @ApiModelProperty(value = "사이트간 거리")
    private int sitedStnc;

    @ApiModelProperty(value = "사이트 크기1 가로")
    private int siteMg1Width;

    @ApiModelProperty(value = "사이트 크기2 가로")
    private int siteMg2Width;

    @ApiModelProperty(value = "사이트 크기3 가로")
    private int siteMg3Width;

    @ApiModelProperty(value = "사이트 크기1 세로")
    private int siteMg1Vrticl;

    @ApiModelProperty(value = "사이트 크기2 세로")
    private int siteMg2Vrticl;

    @ApiModelProperty(value = "사이트 크기3 세로")
    private int siteMg3Vrticl;

    @ApiModelProperty(value = "사이트 크기1 수량")
    private int siteMg1Co;

    @ApiModelProperty(value = "사이트 크기2 수량")
    private int siteMg2Co;

    @ApiModelProperty(value = "사이트 크기3 수량")
    private int siteMg3Co;

    @ApiModelProperty(value = "잔디")
    private int siteBottomCl1;

    @ApiModelProperty(value = "파쇄석")
    private int siteBottomCl2;

    @ApiModelProperty(value = "테크")
    private int siteBottomCl3;

    @ApiModelProperty(value = "자갈")
    private int siteBottomCl4;

    @ApiModelProperty(value = "맨흙")
    private int siteBottomCl5;

    @ApiModelProperty(value = "글램핑 내부시설")
    private String glampInnerFclty;

    @ApiModelProperty(value = "카라반 내부시설")
    private String caravInnerFclty;

    @ApiModelProperty(value = "운영기간")
    private String operPdCl;

    @ApiModelProperty(value = "운영일")
    private String operDeCl;

    @ApiModelProperty(value = "개인 트레일러 동반 여부(Y:사용, N:미사용)")
    private String trlerAcmpnyAt;

    @ApiModelProperty(value = "개인 카라반 동반 여부(Y:사용, N:미사용)")
    private String caravAcmpnyAt;

    @ApiModelProperty(value = "화장실 개수")
    private int toiletCo;

    @ApiModelProperty(value = "샤워실 개수")
    private int swrmCo;

    @ApiModelProperty(value = "개수대 개수")
    private int wtrplCo;

    @ApiModelProperty(value = "화로대 : ['개별', nan, '불가', '공동취사장']")
    private String brazierCl;

    @ApiModelProperty(value = "부대시설")
    private String sbrsCl;

    @ApiModelProperty(value = "부대시설 기타")
    private String sbrsEtc;

    @ApiModelProperty(value = "주변이용가능시설")
    private String posblFcltyCl;

    @ApiModelProperty(value = "주변이용가능시설 기타")
    private String posblFcltyEtc;

    @ApiModelProperty(value = "테마환경")
    private String themaEnvrnCl;

    @ApiModelProperty(value = "캠핑장비대여")
    private String eqpmnLendCl;

    @ApiModelProperty(value = "애완동물출입")
    private String animalCmgCl;

    @ApiModelProperty(value = "대표이미지")
    private String firstImageUrl;
}