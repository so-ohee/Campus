package com.ssafy.camping.service.Impl;

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
    public Map<String, Object> register(String userUid) throws Exception{
        log.debug("UserService register call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<User> userOptional = userRepository.findById(userUid);

        if(!userOptional.isPresent()) { //회원이 존재하지 않을 경우 회원가입
            User user = User.builder()
                    .userUid(userUid).build();
            userRepository.save(user);
            resultMap.put("message", Message.SIGNUP_SUCCESS);
        }else {
            resultMap.put("message", Message.FOUND_USER);
        }
        return resultMap;
    }
}

