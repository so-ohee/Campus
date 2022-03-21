package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.Board.*;
import com.ssafy.camping.dto.FileDto;
import com.ssafy.camping.entity.*;
import com.ssafy.camping.repository.BoardRepository;
import com.ssafy.camping.repository.CampingRepository;
import com.ssafy.camping.repository.RatingRepository;
import com.ssafy.camping.repository.UserRepository;
import com.ssafy.camping.service.BoardService;
import com.ssafy.camping.service.FileService;
import com.ssafy.camping.service.VisitService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final RatingRepository ratingRepository;
    private final CampingRepository campingRepository;
    private final FileService fileService;
    private final VisitService visitService;
    private final UserRepository userRepository;

    @Override
    public Map<String, Object> registerBoard(RegisterBoardReqDto boardDto, MultipartFile[] files) throws Exception {
        log.debug("BoardService registerBoard call");
        Map<String, Object> resultMap = new HashMap<>();

        //게시글 저장
        Board board = Board.builder()
                .userUid(boardDto.getUserUid())
                .category(boardDto.getCategory())
                .title(boardDto.getTitle())
                .content(boardDto.getContent())
                .campingId(boardDto.getCampingId()).build();
        boardRepository.save(board);

        //게시글 카테고리가 후기일 경우
        if(boardDto.getCategory().equals("후기")) {
            //캠핑장 평점 저장
            Rating rating = Rating.builder()
                    .board(board)
                    .environment(boardDto.getEnvironment())
                    .facility(boardDto.getFacility())
                    .service(boardDto.getService()).build();
            ratingRepository.save(rating);

            //방문 저장
            visitService.saveVisitCampsite(board.getCampingId(), board.getUserUid());
        }

        //파일이 존재할 경우 게시글 파일 저장
        if(files != null){
            //파일 확장자 검사
            if(!fileService.fileExtensionCheck(files)) {
                resultMap.put("message", Message.FILE_EXTENSION_EXCEPTION);
                return resultMap;
            }
            //파일 저장
            fileService.boardFileSave(board,files);
        }
        
        resultMap.put("message", Message.CREATE_BOARD_SUCCESS);
        resultMap.put("boardId", board.getBoardId());

        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> deleteBoard(Integer boardId) throws Exception {
        log.debug("BoardService deleteBoard call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<Board> board = boardRepository.findById(boardId);
        if(!board.isPresent() || board.get().getDeleteState()==1) {
            resultMap.put("message", Message.NOT_FOUND_BOARD);
            return resultMap;
        }

        //해당 게시글에 파일이 존재한다면 파일 삭제
        if(board.get().getFiles()!=null) {
            List<FileBoard> files = board.get().getFiles();
            fileService.boardFileDelete(files);
        }

        //카테고리가 후기인 경우
        if(board.get().getCategory().equals("후기")){
            //캠핑장 후기 삭제 처리
            board.get().setDeleteState(1);
            boardRepository.save(board.get());
        } else {
            boardRepository.deleteById(boardId);
        }

        resultMap.put("message", Message.DELETE_BOARD_SUCCESS);
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> getBoard(Integer boardId) throws Exception {
        log.debug("BoardService getBoard call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<Board> board = boardRepository.findById(boardId);
        if(!board.isPresent() || board.get().getDeleteState()==1) { //존재하는 게시글인지 확인
            resultMap.put("message", Message.NOT_FOUND_BOARD);
            return resultMap;
        }

        //파일
        List<FileDto> files = new ArrayList<>();
        for(FileBoard file : board.get().getFiles()) {
            files.add(new FileDto(file.getFileId(), file.getFilePath()));
        }

        //조회수
        int hit = board.get().getHit()+1;
        //조회수 증가
        board.get().setHit(hit);
        boardRepository.save(board.get());

        User user = userRepository.findById(board.get().getUserUid()).get();

        if(board.get().getCategory().equals("후기")) {
            //캠핑장 명
            String campsite = campingRepository.findById(board.get().getCampingId()).get().getFacltNm();
            //평점
            Rating rating = board.get().getRating();

            ReviewBoardResDto reviewBoardResDto = ReviewBoardResDto.builder()
                    .boardId(board.get().getBoardId())
                    .category(board.get().getCategory())
                    .userUid(board.get().getUserUid())
                    .name(user.getName())
                    .profile(user.getProfile())
                    .campingId(board.get().getCampingId())
                    .facltNm(campsite)
                    .environment(rating.getEnvironment())
                    .facility(rating.getFacility())
                    .service(rating.getService())
                    .title(board.get().getTitle())
                    .content(board.get().getContent())
                    .files(files)
                    .createTime(board.get().getCreateTime())
                    .updateTime(board.get().getUpdateTime())
                    .hit(hit).build();
            resultMap.put("board", reviewBoardResDto);
        } else {
            BoardResDto boardResDto = BoardResDto.builder()
                    .boardId(board.get().getBoardId())
                    .category(board.get().getCategory())
                    .userUid(board.get().getUserUid())
                    .name(user.getName())
                    .profile(user.getProfile())
                    .title(board.get().getTitle())
                    .content(board.get().getContent())
                    .files(files)
                    .createTime(board.get().getCreateTime())
                    .updateTime(board.get().getUpdateTime())
                    .hit(hit).build();
            resultMap.put("board", boardResDto);
        }

        resultMap.put("message", Message.FIND_BOARD_SUCCESS);
        return resultMap;
    }

    @Override
    public Map<String, Object> listCampsiteBoard(Integer campingId, int page) throws Exception {
        log.debug("BoardService listCampsiteBoard call");

        Map<String, Object> resultMap = new HashMap<>();
        Page<Board> boards = boardRepository.findByCampingIdAndDeleteState(campingId, 0, PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "boardId")));
        if(boards.isEmpty()) {
            resultMap.put("message", Message.NOT_FOUND_BOARD);
            return resultMap;
        }

        List<ListCampsiteBoardResDto> list = new ArrayList<>();
        for(Board review : boards) {
            Rating rating = review.getRating();
            double ratingAvg = (rating.getEnvironment() + rating.getFacility() + rating.getService()) / 3.0;

            User user = userRepository.findById(review.getUserUid()).get();

            ListCampsiteBoardResDto listCampsiteBoardResDto = ListCampsiteBoardResDto.builder()
                    .boardId(review.getBoardId())
                    .userUid(review.getUserUid())
                    .name(user.getName())
                    .profile(user.getProfile())
                    .rating(ratingAvg)
                    .title(review.getTitle())
                    .createTime(review.getCreateTime())
                    .hit(review.getHit()).build();
            list.add(listCampsiteBoardResDto);
        }

        resultMap.put("message", Message.FIND_BOARD_SUCCESS);
        resultMap.put("totalPage", boards.getTotalPages()); //총 페이지 수
        resultMap.put("board", list);

        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> listBoard(String category, int page) throws Exception {
        log.debug("BoardService listBoard call");

        Page<Board> boards;
        if(category==null) {//카테고리가 없다면 전체 조회
            boards = boardRepository.findByDeleteState(0,PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "boardId")));
        }else {//있다면 해당 카테고리 게시글만 조회
            boards = boardRepository.findByCategoryAndDeleteState(category,0,PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "boardId")));
        }

        return makeListBoard(boards);
    }

    @Override
    public Map<String, Object> userListBoard(String userUid, int page) throws Exception {
        log.debug("BoardService userListBoard call");

        Page<Board> boards = boardRepository.findByUserUidAndDeleteState(userUid,0,PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "boardId")));
        for(Board board : boards) {
            System.out.println(board.getBoardId());
        }
        return makeListBoard(boards);
    }

    @Override
    public Map<String, Object> makeListBoard(Page<Board> boards) throws Exception {
        log.debug("BoardService makeListBoard call");
        Map<String, Object> resultMap = new HashMap<>();

        if(boards.isEmpty()) {
            resultMap.put("message", Message.NOT_FOUND_BOARD);
            return resultMap;
        }
        List<ListBoardResDto> list = new ArrayList<>();
        for(Board board : boards) {
            ListBoardResDto listBoardResDto = ListBoardResDto.builder()
                    .boardId(board.getBoardId())
                    .category(board.getCategory())
                    .title(board.getTitle())
                    .userUid(board.getUserUid())
                    .name(userRepository.findById(board.getUserUid()).get().getName())
                    .createTime(board.getCreateTime())
                    .hit(board.getHit()).build();
            list.add(listBoardResDto);
        }

        resultMap.put("message", Message.FIND_BOARD_SUCCESS);
        resultMap.put("totalPage", boards.getTotalPages()); //총 페이지 수
        resultMap.put("board", list);

        return resultMap;
    }

    @Override
    public boolean stateUserCampsiteReview(Integer campingId, String userUid) throws Exception {
        log.debug("BoardService stateUserCampsiteReview call");

        return boardRepository.existsByCampingIdAndUserUid(campingId, userUid);
    }


}
