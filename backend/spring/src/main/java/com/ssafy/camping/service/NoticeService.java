package com.ssafy.camping.service;

import com.ssafy.camping.dto.Notice.NoticeReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface NoticeService {
    //게시글 등록
    Map<String, Object> postNotice (NoticeReqDto noticeReqDto, MultipartFile[] files) throws Exception;
}
