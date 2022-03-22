package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.User.ModifyUserReqDto;
import com.ssafy.camping.dto.User.UserReqDto;
import com.ssafy.camping.dto.User.UserResDto;
import com.ssafy.camping.entity.Board;
import com.ssafy.camping.entity.User;
import com.ssafy.camping.repository.BoardRepository;
import com.ssafy.camping.repository.SurveyRepository;
import com.ssafy.camping.repository.UserRepository;
import com.ssafy.camping.service.BoardService;
import com.ssafy.camping.service.FileService;
import com.ssafy.camping.service.UserService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final SurveyRepository surveyRepository;
    private final BoardService boardService;
    private final BoardRepository boardRepository;
    private final FileService fileService;

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

        if(!user.isPresent() || user.get().getUserState()==2) { //회원이 존재하지 않을 경우
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

        resultMap.put("user", userResDto);
        resultMap.put("message", Message.FIND_USER_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> withdrawalUser(String userUid) throws Exception {
        log.debug("UserService withdrawalUser call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<User> user = userRepository.findById(userUid);
        if(!user.isPresent() || user.get().getUserState()==2) { //회원이 존재하지 않을 경우
            resultMap.put("message", Message.NOT_FOUND_USER);
            return resultMap;
        }

        // 회원 탈퇴 처리(state : 0 -> 2)
        user.get().setUserState(2);
        userRepository.save(user.get());

        // 작성한 게시글 삭제 처리
        List<Board> boardList = boardRepository.findByUserUid(userUid);
        for(Board b : boardList) {
            boardService.deleteBoard(b.getBoardId());
        }

        resultMap.put("message", Message.USER_WITHDRAWAL_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> modifyUserName(ModifyUserReqDto userDto) throws Exception {
        log.debug("UserService modifyUserName call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<User> user = userRepository.findById(userDto.getUserUid());
        if(!user.isPresent() || user.get().getUserState()==2) { //회원이 존재하지 않을 경우
            resultMap.put("message", Message.NOT_FOUND_USER);
            return resultMap;
        }

        user.get().setName(userDto.getName());
        userRepository.save(user.get());

        resultMap.put("userName", userDto.getName());
        resultMap.put("message", Message.UPDATE_USER_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> modifyUserProfile(String userUid, MultipartFile file) throws Exception {
        log.debug("UserService modifyUserName call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<User> user = userRepository.findById(userUid);
        if(!user.isPresent() || user.get().getUserState()==2) { //회원이 존재하지 않을 경우
            resultMap.put("message", Message.NOT_FOUND_USER);
            return resultMap;
        }

        user.get().setProfile(fileService.userFileUpdate(user.get().getProfile(),file));
        userRepository.save(user.get());
        resultMap.put("profile", user.get().getProfile());
        resultMap.put("message", Message.UPDATE_USER_SUCCESS);
        return resultMap;
    }
}

