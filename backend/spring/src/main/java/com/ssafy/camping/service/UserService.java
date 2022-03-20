package com.ssafy.camping.service;

import com.ssafy.camping.dto.User.UserReqDto;

import java.util.Map;

public interface UserService {
    //회원 가입
    Map<String, Object> register(UserReqDto userReqDto) throws Exception;
    //회원 정보 조회
    Map<String, Object> getUser(String userUid) throws Exception;
}
