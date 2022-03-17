package com.ssafy.camping.service.Impl;

import com.ssafy.camping.entity.Camping;
import com.ssafy.camping.entity.ViewLog;
import com.ssafy.camping.repository.CampingRepository;
import com.ssafy.camping.repository.ViewLogRepository;
import com.ssafy.camping.service.BookmarkService;
import com.ssafy.camping.service.CampingService;
import com.ssafy.camping.service.VisitService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CampingServiceImpl implements CampingService {

    private final CampingRepository campingRepository;
    private final ViewLogRepository viewLogRepository;
    private final BookmarkService bookmarkService;
    private final VisitService visitService;

    @Override
    public Map<String, Object> getCampsite(int campingId, String userUid) throws Exception {
        log.debug("CampingService getCampsite call");
        Map<String, Object> resultMap = new HashMap<>();
        
        Optional<Camping> campsite = campingRepository.findById(campingId);
        if(!campsite.isPresent()) { //캠핑장이 존재하지 않을 경우
            resultMap.put("message", Message.NOT_FOUND_CAMPSITE);
            return resultMap;
        }

        boolean visitCampsite = false;
        boolean bookmark = false;
        if(userUid != null) {//userUid 값이 존재한다면
            //캠핑장 다녀왔는지 확인
            visitCampsite = visitService.stateVisitCampsite(campingId, userUid);
            //캠핑장 북마크 확인
            bookmark = bookmarkService.stateBookmark(campingId, userUid);
            //캠핑장 상세보기 방문 로그 저장
            ViewLog viewLog = ViewLog.builder()
                    .userUid(userUid)
                    .campingId(campingId).build();
            viewLogRepository.save(viewLog);
        }

        resultMap.put("campsite",campsite.get()); //캠핑장 정보
        resultMap.put("visit",visitCampsite); //방문여부
        resultMap.put("bookmark",bookmark); //북마크여부
        resultMap.put("message",Message.FIND_CAMPSITE_SUCCESS);
        return resultMap;
    }
}