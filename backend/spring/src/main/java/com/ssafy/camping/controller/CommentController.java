package com.ssafy.camping.controller;

import com.ssafy.camping.dto.Comment.RegisterCommentReqDto;
import com.ssafy.camping.dto.Comment.ModifyCommentReqDto;
import com.ssafy.camping.service.CommentService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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
    public ResponseEntity registerComment(@Valid @RequestBody RegisterCommentReqDto comment) {
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

    @ApiOperation(value = "댓글 삭제")
    @DeleteMapping({"{commentId}"})
    public ResponseEntity deleteComment(@PathVariable Integer commentId) {
        log.debug("CommentController deleteComment call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = commentService.deleteComment(commentId);
            if (resultMap.get("message").equals(Message.DELETE_COMMENT_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.DELETE_COMMENT_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.DELETE_COMMENT_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "댓글 수정")
    @PutMapping
    public ResponseEntity modifyComment(@RequestBody ModifyCommentReqDto comment) {
        log.debug("CommentController modifyComment call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = commentService.modifyComment(comment);
            if (resultMap.get("message").equals(Message.UPDATE_COMMENT_SUCCESS)) {
                status = HttpStatus.CREATED;
            }
        } catch (Exception e) {
            log.error(Message.UPDATE_COMMENT_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.UPDATE_COMMENT_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "댓글 조회")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "boardId", value = "게시글 고유 번호", required = true,
                    dataType = "int", paramType = "query"),
            @ApiImplicitParam(name = "page", value = "페이지 번호", required = false,
                    dataType = "int", paramType = "query")
    })
    @GetMapping
    public ResponseEntity listComment(@RequestParam Integer boardId,
                                      @RequestParam(defaultValue = "1") int page) {
        log.debug("CommentController listComment call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = commentService.listComment(boardId, page-1);
            if (resultMap.get("message").equals(Message.FIND_COMMENT_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_COMMENT_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.FIND_COMMENT_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
