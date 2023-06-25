package com.joetsumap.common.file.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// import com.joetsumap.common.file.dto.Base64ResponseDTO;
import com.joetsumap.common.file.service.Base64FileService;

import static com.joetsumap.common.constant.ApiConst.*;
import static com.joetsumap.common.constant.ApiPathConst.*;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_IMAGE_PREFIX)
public class ImageController {

  @Autowired
  Base64FileService base64FileService;
  
  @GetMapping("/byte")
  public ResponseEntity<byte[]> getImageToByteArray(@RequestParam String imagePath) throws Exception {
    byte[] bytes = base64FileService.getImageToByteArray(imagePath);
    return ResponseEntity.ok(bytes);
  }
  
  // @GetMapping("/base64")
  // public ResponseEntity<Base64ResponseDTO> getImageToBase64(@RequestParam String imagePath) throws Exception {
  //   Base64ResponseDTO responseDto = base64FileService.getImageToBase64(imagePath);
  //   return ResponseEntity.ok(responseDto);
  // }
}
