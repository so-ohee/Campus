package com.ssafy.camping.service;

import com.ssafy.camping.dto.Board.RegisterBoardReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface BoardService {
    //게시글 등록
    Map<String, Object> registerBoard(RegisterBoardReqDto boardDto, MultipartFile[] files) throws Exception;
    //게시글 삭제
    Map<String, Object> deleteBoard(Integer boardId) throws Exception;
    //게시글 조회
    Map<String, Object> getBoard(Integer boardId) throws Exception;
    //캠핑장 상세보기 - 후기 목록
    Map<String, Object> listCampsiteBoard (Integer campingId, int page) throws Exception;
    //게시글 목록
    Map<String, Object> listBoard (String category, int page) throws Exception;
    //회원의 캠핑장 리뷰 작성 여부
    boolean stateUserCampsiteReview(Integer campingId, String userUid) throws Exception;

}
