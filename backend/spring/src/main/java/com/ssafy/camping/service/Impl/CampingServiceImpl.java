package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.Camping.CampingListDto;
import com.ssafy.camping.entity.Bookmark;
import com.ssafy.camping.entity.Camping;
import com.ssafy.camping.entity.ViewLog;
import com.ssafy.camping.repository.*;
import com.ssafy.camping.service.CampingService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    @Override
    public Map<String, Object> searchCampsite(String doNm, String sigunguNm, String facltNm, int page) throws Exception {
        log.debug("CampingService searchCampsite call");

        Map<String, Object> resultMap = new HashMap<>();
        Page<Camping> campsites = null;
        PageRequest pageRequest = PageRequest.of(page, 6, Sort.by(Sort.Direction.DESC, "campingId"));
        if(doNm.equals("전체")) {
            if(facltNm == null)
                campsites = campingRepository.findAll(pageRequest);
            else
                campsites = campingRepository.findByFacltNmContainingIgnoreCase(facltNm, pageRequest);
        }else if(sigunguNm.equals("전체")) {
            if(facltNm == null)
                campsites = campingRepository.findByDoNm(doNm, pageRequest);
            else
                campsites = campingRepository.findByDoNmAndFacltNmContainingIgnoreCase(doNm, facltNm, pageRequest);
        } else {
            if(facltNm == null)
                campsites = campingRepository.findByDoNmAndSigunguNm(doNm, sigunguNm, pageRequest);
            else
                campsites = campingRepository.findByDoNmAndSigunguNmAndFacltNmContainingIgnoreCase(doNm, sigunguNm, facltNm, pageRequest);
        }

        if(campsites.isEmpty()) {
            resultMap.put("message", Message.NOT_FOUND_CAMPSITE);
            return resultMap;
        }

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

        resultMap.put("campsite",campingList);
        resultMap.put("totalPage", campsites.getTotalPages());
        resultMap.put("message",Message.FIND_CAMPSITE_SUCCESS);
        return resultMap;
    }
}