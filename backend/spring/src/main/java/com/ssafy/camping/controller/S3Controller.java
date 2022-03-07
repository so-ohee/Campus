package com.ssafy.camping.controller;

import com.ssafy.camping.service.S3Service;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("s3")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class S3Controller {

    @Autowired
    S3Service s3Service;

    @ApiOperation(value = "s3 이미지 등록", notes = "이미지 파일 포함 필수, 확장자는 jpg 또는 png")
    @PostMapping
    public ResponseEntity registerImage(MultipartFile[] files){
        try{
            for (MultipartFile mfile : files) {
                String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기
                log.info("image upload 완료 {}", imgURL);
            }
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }catch (Exception e){
            log.info("Exception >> {}", e.getMessage());
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.OK);
        }
    }

    @ApiOperation(value = "s3 이미지 삭제")
    @DeleteMapping
    public ResponseEntity getImage(@ApiParam(value = "삭제할 imgURL") @RequestParam String imgURL){
        try{
            s3Service.delete(imgURL);
            log.info("image delete 완료 {}", imgURL);
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (Exception e){
            log.info("Exception >> {}", e.getMessage());
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}