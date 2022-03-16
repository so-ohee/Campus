package com.ssafy.camping.controller;

import com.ssafy.camping.dto.Notice.NoticeReqDto;
import com.ssafy.camping.service.NoticeService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class NoticeController {

    private final NoticeService noticeService;

    @ApiOperation(value = "게시글 등록")
    @PostMapping
    public ResponseEntity post(@Valid @RequestPart NoticeReqDto notice,
                               @RequestPart(required = false) MultipartFile[] files) {
        log.debug("NoticeController post call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = noticeService.postNotice(notice, files);
            if(resultMap.get("message").equals(Message.CREATE_NOTICE_SUCCESS)) {
                status = HttpStatus.CREATED;
            }
        } catch (Exception e) {
            log.error(Message.CREATE_NOTICE_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.CREATE_NOTICE_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "게시글 삭제")
    @DeleteMapping("/{noticeId}")
    public ResponseEntity delete(@PathVariable Integer noticeId) {
        log.debug("NoticeController delete call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = noticeService.deleteNotice(noticeId);
            if(resultMap.get("message").equals(Message.DELETE_NOTICE_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.DELETE_NOTICE_FAIL+": {}",e.getMessage());

            resultMap.put("message", Message.DELETE_NOTICE_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
