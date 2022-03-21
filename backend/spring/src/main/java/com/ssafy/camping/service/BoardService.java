package com.ssafy.camping.service;

import com.ssafy.camping.dto.Board.ModifyBoardReqDto;
import com.ssafy.camping.dto.Board.RegisterBoardReqDto;
import com.ssafy.camping.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface BoardService {
    //게시글 등록
    Map<String, Object> registerBoard(RegisterBoardReqDto boardDto, MultipartFile[] files) throws Exception;
    //게시글 수정
    Map<String, Object> modifyBoard(ModifyBoardReqDto boardDto, MultipartFile[] files) throws Exception;
    //게시글 삭제
    Map<String, Object> deleteBoard(Integer boardId) throws Exception;
    //게시글 조회
    Map<String, Object> getBoard(Integer boardId) throws Exception;
    //캠핑장 상세보기 - 후기 목록
    Map<String, Object> listCampsiteBoard (Integer campingId, int page) throws Exception;

    //게시글 목록
    Map<String, Object> listBoard (String category, int page) throws Exception;
    //회원이 작성한 게시글 목록
    Map<String, Object> userListBoard (String userUid, int page) throws Exception;
    //목록 만들기
    Map<String, Object> makeListBoard (Page<Board> boards) throws Exception;
}
