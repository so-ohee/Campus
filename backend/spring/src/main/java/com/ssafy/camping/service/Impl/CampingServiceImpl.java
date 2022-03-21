package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.Camping.CampingListDto;
import com.ssafy.camping.entity.Camping;
import com.ssafy.camping.entity.ViewLog;
import com.ssafy.camping.repository.*;
import com.ssafy.camping.service.CampingService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class CampingServiceImpl implements CampingService {

    private final CampingRepository campingRepository;
    private final ViewLogRepository viewLogRepository;
    private final BookmarkRepository bookmarkRepository;
    private final VisitRepository visitRepository;
    private final BoardRepository boardRepository;

    @Override
    public Map<String, Object> getCampsite(int campingId, String userUid) throws Exception {
        log.debug("CampingService getCampsite call");
        Map<String, Object> resultMap = new HashMap<>();
        
        Optional<Camping> campsite = campingRepository.findById(campingId);
        if(!campsite.isPresent()) { //캠핑장이 존재하지 않을 경우
            resultMap.put("message", Message.NOT_FOUND_CAMPSITE);
            return resultMap;
        }

        //userUid 값이 존재한다면
        if(userUid != null) {
            //캠핑장 상세보기 방문 로그 저장
            ViewLog viewLog = ViewLog.builder()
                    .userUid(userUid)
                    .campingId(campingId).build();
            viewLogRepository.save(viewLog);

            resultMap.put("visit",visitRepository.existsByCampingIdAndUserUid(campingId, userUid)); //방문여부
            resultMap.put("bookmark",bookmarkRepository.existsByCampingIdAndUserUid(campingId, userUid)); //북마크여부
            resultMap.put("review", boardRepository.existsByCampingIdAndUserUid(campingId, userUid)); //리뷰여부
        }

        resultMap.put("campsite",campsite.get()); //캠핑장 정보
        resultMap.put("message",Message.FIND_CAMPSITE_SUCCESS);
        return resultMap;
    }

    @Override
    public List<CampingListDto> makeListCampsite(List<Integer> campingIds) throws Exception {
        log.debug("CampingService makeListCampsite call");

        List<Camping> campsites = campingRepository.findByCampingIdIn(campingIds);

        List<CampingListDto> campingList = new ArrayList<>();
        for(Camping camping : campsites){
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