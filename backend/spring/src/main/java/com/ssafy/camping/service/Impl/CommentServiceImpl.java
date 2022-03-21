package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.Comment.CommentReqDto;
import com.ssafy.camping.entity.Board;
import com.ssafy.camping.entity.Comment;
import com.ssafy.camping.entity.Rating;
import com.ssafy.camping.repository.CommentRepository;
import com.ssafy.camping.service.CommentService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Map<String, Object> registerComment(CommentReqDto commentDto) throws Exception {
        log.debug("CommentService registerComment call");
        Map<String, Object> resultMap = new HashMap<>();

        //댓글 저장
        Comment comment = Comment.builder()
                .boardId(commentDto.getBoardId())
                .userUid(commentDto.getUserUid())
                .comment(commentDto.getComment()).build();
        commentRepository.save(comment);

        resultMap.put("message", Message.CREATE_COMMENT_SUCCESS);
        resultMap.put("commentId", comment.getCommentId());

        return resultMap;
    }
}
