package com.ssafy.camping.controller;

import com.ssafy.camping.dto.Board.RegisterBoardReqDto;
import com.ssafy.camping.service.BoardService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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
@RequestMapping("/board")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class BoardController {

    private final BoardService boardService;

    @ApiOperation(value = "게시글 등록")
    @PostMapping
    public ResponseEntity registerBoard(@Valid @RequestPart RegisterBoardReqDto board,
                                   @RequestPart(required = false) MultipartFile[] files) {
        log.debug("BoardController registerBoard call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            //게시글 카테고리가 후기인데 캠핑장 Id, 평점이 없을경우 후기 등록 불가
            if(board.getCategory().equals("후기") &&
                    (board.getCampingId() == null || board.getEnvironment() == null || board.getFacility() == null || board.getService() == null)) {
                resultMap.put("message", Message.NOT_FOUND_CAMPSITE_REVIEW);
            }else {
                resultMap = boardService.registerBoard(board, files);
                if (resultMap.get("message").equals(Message.CREATE_BOARD_SUCCESS)) {
                    status = HttpStatus.CREATED;
                }
            }
        } catch (Exception e) {
            log.error(Message.CREATE_BOARD_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.CREATE_BOARD_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "게시글 삭제")
    @DeleteMapping("{boardId}")
    public ResponseEntity deleteBoard(@PathVariable Integer boardId) {
        log.debug("BoardController deleteBoard call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = boardService.deleteBoard(boardId);
            if(resultMap.get("message").equals(Message.DELETE_BOARD_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.DELETE_BOARD_FAIL+": {}",e.getMessage());

            resultMap.put("message", Message.DELETE_BOARD_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "게시글 조회")
    @GetMapping("{boardId}")
    public ResponseEntity getBoard(@PathVariable Integer boardId) {
        log.debug("BoardController getBoard call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = boardService.getBoard(boardId);
            if(resultMap.get("message").equals(Message.FIND_BOARD_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_BOARD_FAIL+": {}",e.getMessage());

            resultMap.put("message", Message.FIND_BOARD_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "캠핑장 상세보기 - 후기 목록")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "campingId", value = "캠핑장 고유 번호", required = true,
                    dataType = "int", paramType = "query"),
            @ApiImplicitParam(name = "page", value = "페이지 번호", required = false,
                    dataType = "int", paramType = "query")
    })
    @GetMapping("/review")
    public ResponseEntity listCampsiteBoard(@RequestParam Integer campingId,
                                             @RequestParam(defaultValue = "1") int page) {
        log.debug("BoardController listCampsiteBoard call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = boardService.listCampsiteBoard(campingId, page-1);
            if(resultMap.get("message").equals(Message.FIND_BOARD_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_BOARD_FAIL+": {}",e.getMessage());

            resultMap.put("message", Message.FIND_BOARD_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "게시글 목록")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "category", value = "카테고리", required = false,
                    dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "page", value = "페이지 번호", required = false,
                    dataType = "int", paramType = "query")
    })
    @GetMapping()
    public ResponseEntity listBoard(@RequestParam(required = false) String category,
                                            @RequestParam(defaultValue = "1") int page) {
        log.debug("BoardController listBoard call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = boardService.listBoard(category, page-1);
            if(resultMap.get("message").equals(Message.FIND_BOARD_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_BOARD_FAIL+": {}",e.getMessage());

            resultMap.put("message", Message.FIND_BOARD_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }


    @ApiOperation(value = "내가 작성한 게시글 목록")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userUid", value = "회원 고유 번호", required = true,
                    dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "page", value = "페이지 번호", required = false,
                    dataType = "int", paramType = "query")
    })
    @GetMapping("/board")
    public ResponseEntity userListBoard (@RequestParam String userUid,
                                         @RequestParam(defaultValue = "1") int page)  {
        log.debug("BoardController userListBoard call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = boardService.userListBoard(userUid, page-1);
            if(resultMap.get("message").equals(Message.FIND_BOARD_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_BOARD_FAIL+": {}",e.getMessage());

            resultMap.put("message", Message.FIND_BOARD_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
