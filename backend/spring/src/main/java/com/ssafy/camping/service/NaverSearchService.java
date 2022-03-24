package com.ssafy.camping.service;

import java.util.Map;

public interface NaverSearchService {
    //캠핑 관련 쇼핑
    Map<String, Object> getItem(Integer page) throws Exception;
}
