package com.ssafy.camping.controller;

import com.ssafy.camping.service.NaverSearchService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiImplicitParam;
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
@RequiredArgsConstructor
@RequestMapping("/shop")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class ShoppingController {

    private final NaverSearchService shoppingService;

    @ApiOperation(value = "쇼핑 목록")
    @ApiImplicitParam(name = "page", value = "페이지 번호", required = false,
            dataType = "int", paramType = "query")
    @GetMapping()
    public ResponseEntity getItem(@RequestParam(defaultValue = "1") Integer page) throws Exception {
        log.debug("ShoppingController getItem call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = shoppingService.getItem(page);
            if(resultMap.get("message").equals(Message.FIND_ITEM_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_ITEM_FAIL+": {}", e.getMessage());

            resultMap.put("message", Message.FIND_ITEM_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}