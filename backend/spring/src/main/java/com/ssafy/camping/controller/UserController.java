package com.ssafy.camping.controller;

import com.ssafy.camping.service.UserService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class UserController {

    private final UserService userService;

    @ApiOperation(value = "회원 가입")
    @GetMapping("/{userUid}")
    public ResponseEntity register(@PathVariable String userUid) {
        log.debug("UserController register call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = userService.register(userUid);
            if(resultMap.get("message").equals(Message.SIGNUP_SUCCESS)) //회원가입 성공
                status = HttpStatus.CREATED;
        } catch (Exception e) {
            log.error(Message.SIGNUP_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.SIGNUP_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
