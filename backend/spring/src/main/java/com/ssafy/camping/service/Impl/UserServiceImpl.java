package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.User.UserReqDto;
import com.ssafy.camping.dto.User.UserResDto;
import com.ssafy.camping.entity.User;
import com.ssafy.camping.repository.UserRepository;
import com.ssafy.camping.service.UserService;
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
        Map<String, Object> resultMap = new HashMap<>();
        Optional<User> userOptional = userRepository.findById(userReqDto.getUserUid());

        if(userOptional.isPresent()) {
            resultMap.put("message","이미 가입된 회원입니다.");
        } else {
            User user = User.builder()
                    .userUid(userReqDto.getUserUid())
                    .userName(userReqDto.getUserName())
                    .userProfile(userReqDto.getUserProfile()).build();
            userRepository.save(user);

            resultMap.put("user", getUser(user.getUserUid()));
        }
        return resultMap;
    }

    @Override
    public UserResDto getUser(String userUid) throws Exception {
        User user = userRepository.findById(userUid).get();
        String userState = "";
        switch (user.getUserState()) {
            case 0 : userState = "user"; break;
            case 1 : userState = "admin"; break;
            default : userState = "user_D";
        }
        UserResDto userResDto = UserResDto.builder()
                .userUid(user.getUserUid())
                .userName(user.getUserName())
                .userState(userState)
                .userProfile(user.getUserProfile()).build();
        return userResDto;
    }
}

