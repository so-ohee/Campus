package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.UserDto;
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
    public Map<String, Object> register(UserDto userDto) throws Exception{
        log.debug("UserService register call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<User> userOptional = userRepository.findById(userDto.getUserUid());

        if(!userOptional.isPresent()) { //회원이 존재하지 않을 경우 회원가입
            User user = User.builder()
                    .userUid(userDto.getUserUid())
                    .name(userDto.getName()).build();
            userRepository.save(user);

            //파일이 존재할 경우 파일 저장
            if(userDto.getProfile()!=null) {
                user.setProfile(userDto.getProfile());
                userRepository.save(user);
            }

            resultMap.put("message", Message.SIGNUP_SUCCESS);
        }else {
            resultMap.put("message", Message.FOUND_USER);
        }
        return resultMap;
    }
}

