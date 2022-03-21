package com.ssafy.camping.controller;

import com.ssafy.camping.service.BookmarkService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/bookmark")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @ApiOperation(value = "내가 작성한 북마크한 캠핑장 목록")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userUid", value = "회원 고유 번호", required = true,
                    dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "page", value = "페이지 번호", required = false,
                    dataType = "int", paramType = "query")
    })
    @GetMapping("/user")
    public ResponseEntity userListBookmark (@RequestParam String userUid,
                                         @RequestParam(defaultValue = "1") int page)  {
        log.debug("BookmarkController userListBookmark call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = bookmarkService.userListBookmark(userUid, page-1);
            if(resultMap.get("message").equals(Message.FIND_BOOKMARK_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_BOOKMARK_FAIL+": {}",e.getMessage());

            resultMap.put("message", Message.FIND_BOOKMARK_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
