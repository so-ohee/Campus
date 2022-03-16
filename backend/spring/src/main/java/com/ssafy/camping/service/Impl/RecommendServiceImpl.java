package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.Camping.CampingListDto;
import com.ssafy.camping.entity.Camping;
import com.ssafy.camping.repository.CampingRepository;
import com.ssafy.camping.service.RecommendService;
import com.ssafy.camping.service.VisitService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiModelProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendServiceImpl implements RecommendService {

    private final CampingRepository campingRepository;
    private final VisitService visitService;

    @Override
    public Map<String, Object> mainRecommend(String userUid) throws Exception {
        log.debug("RecommendService mainRecommend call");
        Map<String, Object> resultMap = new HashMap<>();

        LocalDate now = LocalDate.now();

        int month = now.getMonth().getValue();
        String season = "";
        String thema = "";
        if(month >= 3 && month <= 5) {
            season = "봄";
            thema = "봄꽃여행";
        }
        else if(month >= 6 && month <= 8) {
            season = "여름";
            thema = "여름물놀이|수상레저";
        }
        else if(month >= 9 && month <= 11) {
            season = "가을";
            thema = "가을단풍명소";
        }
        else {
            season = "겨울";
            thema = "스키|겨울눈꽃명소";
        }

        resultMap.put("season", season + "에 이런 캠핑장 어때요?"); //문구 만들어서 줄까?

        //계절에 맞는 캠핑장 중 블로그 글 많은 50곳
        List<Camping> seasonList = campingRepository.searchByThema(thema);
        resultMap.put("seasonList", randomSelect(seasonList)); //필요한 정보만 보내기 -> 캠핑장명 + 주소 + ?
        
        //블로그 글 많은 100곳
        List<Camping> blogList = campingRepository.findTop100ByOrderByBlogCntDesc();
        resultMap.put("blogList", randomSelect(blogList));

        resultMap.put("message", Message.FIND_CAMPSITE_SUCCESS);

        return resultMap;
    }

    @Override
    public List<CampingListDto> randomSelect(List<Camping> list) throws Exception{

        int total = list.size();
        Set<Integer> set = new HashSet<>();

        while(set.size() < 3){
            Double d = Math.random() * total;
            set.add(d.intValue());
        }

        List<CampingListDto> campingList = new ArrayList<>();
        for(Integer i : set){
            Camping camping = list.get(i);
            CampingListDto campingListDto = CampingListDto.builder()
                    .campingId(camping.getCampingId())
                    .firstImageUrl(camping.getFirstImageUrl())
                    .facltNm(camping.getFacltNm())
                    .addr1(camping.getAddr1())
                    .induty(camping.getInduty())
                    .lctCl(camping.getLctCl())
                    .themaEnvrnCl(camping.getThemaEnvrnCl())
                    .build();

            campingList.add(campingListDto);
        }

        return campingList;
    }
}