package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.Comment.RegisterCommentReqDto;
import com.ssafy.camping.dto.Comment.ModifyCommentReqDto;
import com.ssafy.camping.entity.Comment;
import com.ssafy.camping.repository.CommentRepository;
import com.ssafy.camping.service.CommentService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Map<String, Object> registerComment(RegisterCommentReqDto commentDto) throws Exception {
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

    @Override
    public Map<String, Object> deleteComment(Integer commentId) throws Exception {
        log.debug("CommentService deleteComment call");
        Map<String, Object> resultMap = new HashMap<>();

        if(!commentRepository.findById(commentId).isPresent()) {
            resultMap.put("message", Message.NOT_FOUND_COMMENT);
            return resultMap;
        }

        commentRepository.deleteById(commentId);
        resultMap.put("message", Message.DELETE_COMMENT_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> modifyComment(ModifyCommentReqDto commentDto) throws Exception {
        log.debug("CommentService modifyComment call");
        Map<String, Object> resultMap = new HashMap<>();

        Optional<Comment> comment = commentRepository.findById(commentDto.getCommentId());

        if(!comment.isPresent()) {
            resultMap.put("message", Message.NOT_FOUND_COMMENT);
            return resultMap;
        }

        //댓글 수정
        comment.get().setComment(commentDto.getComment());
        comment.get().setUpdateTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        commentRepository.save(comment.get());

        resultMap.put("message", Message.UPDATE_COMMENT_SUCCESS);
        resultMap.put("commentId", comment.get().getCommentId());
        return resultMap;
    }
}
