package com.ssafy.camping.controller;

import com.ssafy.camping.dto.User.UserReqDto;
import com.ssafy.camping.service.UserService;
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

    //회원 가입
    @ApiOperation(value = "회원 가입")
    @PostMapping
    public ResponseEntity register(@Valid @RequestBody UserReqDto userReqDto) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap = userService.register(userReqDto);
            HttpStatus status = HttpStatus.ACCEPTED;
            if(resultMap.containsKey("user"))
                status = HttpStatus.CREATED;

            return new ResponseEntity(resultMap, status);
        } catch (Exception e) {
            log.error("회원가입 실패 : {}", e.getMessage());
            resultMap.put("message","회원가입 실패");
            return new ResponseEntity(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
