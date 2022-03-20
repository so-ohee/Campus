package com.ssafy.camping.service;

import com.ssafy.camping.dto.UserDto;

import java.util.Map;

public interface UserService {
    //회원 가입
    Map<String, Object> register(UserDto userDto) throws Exception;

}
