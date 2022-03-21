package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.Comment.CommentResDto;
import com.ssafy.camping.dto.Comment.RegisterCommentReqDto;
import com.ssafy.camping.dto.Comment.ModifyCommentReqDto;
import com.ssafy.camping.entity.Comment;
import com.ssafy.camping.entity.User;
import com.ssafy.camping.repository.CommentRepository;
import com.ssafy.camping.repository.UserRepository;
import com.ssafy.camping.service.CommentService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

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

    @Override
    public Map<String, Object> listComment(Integer boardId, int page) throws Exception {
        log.debug("CommentService listComment call");

        Map<String, Object> resultMap = new HashMap<>();
        Page<Comment> comments = commentRepository.findByBoardId(boardId, PageRequest.of(page, 20, Sort.by(Sort.Direction.DESC, "commentId")));
        if(comments.isEmpty()) {
            resultMap.put("message", Message.NOT_FOUND_COMMENT);
            return resultMap;
        }

        List<CommentResDto> list = new ArrayList<>();
        for(Comment c : comments) {
            User user = userRepository.findById(c.getUserUid()).get();

            CommentResDto comment = CommentResDto.builder()
                    .commentId(c.getCommentId())
                    .userUid(c.getUserUid())
                    .name(user.getName())
                    .profile(user.getProfile())
                    .comment(c.getComment())
                    .createTime(c.getCreateTime())
                    .updateTime(c.getUpdateTime()).build();
            list.add(comment);
        }
        resultMap.put("message", Message.FIND_COMMENT_SUCCESS);
        resultMap.put("comment", list);
        resultMap.put("totalPage", comments.getTotalPages());
        return resultMap;
    }
}
