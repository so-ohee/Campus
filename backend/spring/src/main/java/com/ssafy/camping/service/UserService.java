package com.ssafy.camping.service;

import com.ssafy.camping.dto.User.ModifyUserReqDto;
import com.ssafy.camping.dto.User.UserReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface UserService {
    //회원 가입
    Map<String, Object> register(UserReqDto userReqDto) throws Exception;
    //회원 정보 조회
    Map<String, Object> getUser(String userUid) throws Exception;
    //회원 탈퇴
    Map<String, Object> withdrawalUser(String userUid) throws Exception;
    //회원 이름 수정
    Map<String, Object> modifyUserName(ModifyUserReqDto userDto) throws  Exception;
    //회원 프로필 수정
    Map<String, Object> modifyUserProfile(String userUid, MultipartFile file) throws Exception;
}
