package com.ssafy.camping.service.Impl;

import com.ssafy.camping.entity.Visit;
import com.ssafy.camping.repository.BoardRepository;
import com.ssafy.camping.repository.CampingRepository;
import com.ssafy.camping.repository.VisitRepository;
import com.ssafy.camping.service.CampingService;
import com.ssafy.camping.service.VisitService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class VisitServiceImpl implements VisitService {

    private final VisitRepository visitRepository;
    private final BoardRepository boardRepository;
    private final CampingRepository campingRepository;
    private final CampingService campingService;

    @Override
    @Transactional
    public Map<String, Object> userVisit(String userUid, Integer campingId) throws Exception {
        log.debug("VisitService userVisit call");

        Map<String, Object> resultMap = new HashMap<>();
        if(!campingRepository.findById(campingId).isPresent()) { //존재하는 캠핑장인지 확인
            resultMap.put("message", Message.NOT_FOUND_CAMPSITE);
            return resultMap;
        }

        resultMap = saveVisitCampsite(campingId, userUid);
        if(resultMap.get("message").equals(Message.SAVE_VISIT)) { //이미 다녀온 캠핑장 이므로 취소해야함
            resultMap = deleteVisitCampsite(campingId, userUid);
        }

        resultMap.put("visit", visitRepository.existsByCampingIdAndUserUid(campingId, userUid));
        return resultMap;
    }

    @Override
    public Map<String, Object> saveVisitCampsite(Integer campingId, String userUid) throws Exception {
        log.debug("VisitService saveVisitCampsite call");

        Map<String, Object> resultMap = new HashMap<>();
        //캠핑장 방문 여부 확인
        if(visitRepository.existsByCampingIdAndUserUid(campingId, userUid)) {
            resultMap.put("message", Message.SAVE_VISIT);
            return resultMap;
        }

        Visit visit = Visit.builder()
                .campingId(campingId)
                .userUid(userUid).build();
        visitRepository.save(visit);

        resultMap.put("message", Message.SAVE_VISIT_SUCCESS);
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> deleteVisitCampsite(Integer campingId, String userUid) throws Exception {
        log.debug("VisitService deleteVisitCampsite call");

        Map<String, Object> resultMap = new HashMap<>();
        //리뷰 작성이 되어있으면 방문 취소 불가
        if(boardRepository.existsByCampingIdAndUserUidAndDeleteState(campingId,userUid,0)) {
            resultMap.put("message", Message.DELETE_VISIT_FAIL);
        } else {
            visitRepository.deleteByCampingIdAndUserUid(campingId,userUid);
            resultMap.put("message", Message.DELETE_VISIT_SUCCESS);
        }
        return resultMap;
    }

    @Override
    public Map<String, Object> userListVisit(String userUid, int page) throws Exception {
        log.debug("VisitService userListVisit call");

        Map<String, Object> resultMap = new HashMap<>();
        Page<Visit> visits = visitRepository.findByUserUid(userUid, PageRequest.of(page, 6, Sort.by(Sort.Direction.DESC, "visitId")));
        if(visits.isEmpty()) {
            resultMap.put("message", Message.NOT_FOUND_VISIT);
            return resultMap;
        }

        List<Integer> campingIds = new ArrayList<>();
        for(Visit v : visits) {
            campingIds.add(v.getCampingId());
        }

        resultMap.put("message", Message.FIND_BOOKMARK_SUCCESS);
        resultMap.put("campsite", campingService.makeListCampsite(campingIds));
        resultMap.put("totalPage", visits.getTotalPages());
        return resultMap;
    }
}
