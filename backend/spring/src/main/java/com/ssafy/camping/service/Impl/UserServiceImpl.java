package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.User.UserReqDto;
import com.ssafy.camping.dto.User.UserResDto;
import com.ssafy.camping.entity.User;
import com.ssafy.camping.repository.SurveyRepository;
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
    private final SurveyRepository surveyRepository;

    @Override
    public Map<String, Object> register(UserReqDto userReqDto) throws Exception{
        log.debug("UserService register call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<User> userOptional = userRepository.findById(userReqDto.getUserUid());

        if(!userOptional.isPresent()) { //회원이 존재하지 않을 경우 회원가입
            User user = User.builder()
                    .userUid(userReqDto.getUserUid())
                    .name(userReqDto.getName()).build();
            userRepository.save(user);

            //파일이 존재할 경우 파일 저장
            if(userReqDto.getProfile()!=null) {
                user.setProfile(userReqDto.getProfile());
                userRepository.save(user);
            }

            resultMap.put("message", Message.SIGNUP_SUCCESS);
        }else {
            resultMap.put("message", Message.FOUND_USER);
        }
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
            default : userState = "secession";
        }
        UserResDto userResDto = UserResDto.builder()
                .userUid(user.get().getUserUid())
                .name(user.get().getName())
                .profile(user.get().getProfile())
                .userState(userState)
                .survey(surveyRepository.existsByUserUid(userUid)).build();

        resultMap.put("message", Message.FIND_USER_SUCCESS);
        resultMap.put("user", userResDto);
        return resultMap;
    }
}

