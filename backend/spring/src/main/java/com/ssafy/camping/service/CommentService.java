package com.ssafy.camping.service;

import com.ssafy.camping.dto.Comment.CommentReqDto;

import java.util.Map;

public interface CommentService {
    //댓글 등록
    Map<String, Object> registerComment (CommentReqDto comment) throws Exception;
}
