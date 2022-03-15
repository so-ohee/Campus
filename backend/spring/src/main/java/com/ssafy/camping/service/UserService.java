package com.ssafy.camping.service;

import java.util.Map;

public interface UserService {
    //회원 가입
    Map<String, Object> register(String userUid) throws Exception;

}
