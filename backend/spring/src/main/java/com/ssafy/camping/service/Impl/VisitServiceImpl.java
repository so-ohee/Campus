package com.ssafy.camping.service.Impl;

import com.ssafy.camping.entity.Visit;
import com.ssafy.camping.repository.VisitRepository;
import com.ssafy.camping.service.VisitService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class VisitServiceImpl implements VisitService {

    private final VisitRepository visitRepository;

    @Override
    public boolean stateVisitCampsite(Integer campingId, String userUid) throws Exception {
        log.debug("VisitService stateVisitCampsite call");

        return visitRepository.existsByCampingIdAndUserUid(campingId, userUid);
    }

    @Override
    public Map<String, Object> saveVisitCampsite(Integer campingId, String userUid) throws Exception {
        log.debug("VisitService saveVisitCampsite call");

        Map<String, Object> resultMap = new HashMap<>();
        //캠핑장 방문 여부 확인
        if(stateVisitCampsite(campingId, userUid)) {
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
}
