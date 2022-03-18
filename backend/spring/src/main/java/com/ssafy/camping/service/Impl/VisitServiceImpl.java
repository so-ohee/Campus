package com.ssafy.camping.service.Impl;

import com.ssafy.camping.repository.VisitRepository;
import com.ssafy.camping.service.VisitService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
}
