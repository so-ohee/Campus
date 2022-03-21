package com.ssafy.camping.service;

import com.ssafy.camping.dto.Comment.RegisterCommentReqDto;
import com.ssafy.camping.dto.Comment.ModifyCommentReqDto;

import java.util.Map;

public interface CommentService {
    //댓글 등록
    Map<String, Object> registerComment (RegisterCommentReqDto comment) throws Exception;
    //댓글 삭제
    Map<String, Object> deleteComment (Integer commentId) throws Exception;
    //댓글 수정
    Map<String, Object> modifyComment (ModifyCommentReqDto commentDto) throws Exception;
}
