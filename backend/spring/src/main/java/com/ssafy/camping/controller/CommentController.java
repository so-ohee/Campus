package com.ssafy.camping.controller;

import com.ssafy.camping.dto.Comment.CommentReqDto;
import com.ssafy.camping.service.CommentService;
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
@RequestMapping("/comment")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class CommentController {

    private final CommentService commentService;

    @ApiOperation(value = "댓글 등록")
    @PostMapping
    public ResponseEntity registerComment(@Valid @RequestBody CommentReqDto comment) {
        log.debug("CommentController registerComment call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = commentService.registerComment(comment);
            if (resultMap.get("message").equals(Message.CREATE_COMMENT_SUCCESS)) {
                status = HttpStatus.CREATED;
            }
        } catch (Exception e) {
            log.error(Message.CREATE_COMMENT_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.CREATE_COMMENT_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
