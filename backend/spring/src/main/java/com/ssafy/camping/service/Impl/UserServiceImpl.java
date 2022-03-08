package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.User.UserReqDto;
import com.ssafy.camping.dto.User.UserResDto;
import com.ssafy.camping.entity.User;
import com.ssafy.camping.repository.UserRepository;
import com.ssafy.camping.service.UserService;
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
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Map<String, Object> register(UserReqDto userReqDto) throws Exception{
        log.debug("UserService register call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<User> userOptional = userRepository.findById(userReqDto.getUserUid());

        if(!userOptional.isPresent()) { //회원이 존재하지 않을 경우 회원가입
            User user = User.builder()
                    .userUid(userReqDto.getUserUid())
                    .userName(userReqDto.getUserName())
                    .userProfile(userReqDto.getUserProfile()).build();
            userRepository.save(user);
            resultMap.put("message", Message.SIGNUP_SUCESS);
        }else {
            resultMap.put("message", Message.FOUND_USER);
        }
        resultMap.put("user", getUser(userReqDto.getUserUid()).get("user"));//회원 정보 반환
        return resultMap;
    }

    @Override
    public Map<String, Object> getUser(String userUid) throws Exception {
        log.debug("UserService getUser call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<User> user = userRepository.findById(userUid);

        if(!user.isPresent()) { //회원이 존재하지 않을 경우
            resultMap.put("message", Message.NOT_FOUND_USER);
            return resultMap;
        }

        String userState = "";
        switch (user.get().getUserState()) {
            case 0 : userState = "user"; break;
            case 1 : userState = "admin"; break;
            default : userState = "user_D";
        }
        UserResDto userResDto = UserResDto.builder()
                .userUid(user.get().getUserUid())
                .userName(user.get().getUserName())
                .userState(userState)
                .userProfile(user.get().getUserProfile()).build();
        resultMap.put("message", Message.FIND_USER_SUCESS);
        resultMap.put("user", userResDto);
        return resultMap;
    }
}

