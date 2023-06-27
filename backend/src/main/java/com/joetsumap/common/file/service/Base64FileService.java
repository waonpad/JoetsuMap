package com.joetsumap.common.file.service;

import java.io.ByteArrayInputStream;

import com.joetsumap.common.file.constant.FileConst;
import com.joetsumap.common.file.dto.Base64ResponseDTO;
import com.joetsumap.common.file.util.FileUtil;

import jakarta.transaction.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.UUID;

import org.springframework.stereotype.Service;

// 簡易実装
@Service
@Transactional(rollbackOn = Exception.class)
public class Base64FileService {

  public String uploadImageFromBase64(String base64Image, String saveDir) {
    String fileName = UUID.randomUUID().toString() + FileConst.IMAGE_SAVE_FORMAT;

    String realSaveDir = FileConst.IMAGE_SAVE_DIR + saveDir;

    try {
      byte[] imageBytes = Base64.getDecoder().decode(base64Image);

      Path destinationFile = Path.of(realSaveDir + fileName);
      Files.copy(
        new ByteArrayInputStream(imageBytes),
        destinationFile,
        StandardCopyOption.REPLACE_EXISTING
      );
    } catch (IOException e) {
      e.printStackTrace();
      throw new RuntimeException("File upload error.");

      // NOTE: ディレクトリが無いとエラーになるので、新しく必要な場合は作成して.gitkeepを配置する
    }

    return saveDir + fileName;
  }

  public byte[] getImageToByteArray(String imagePath) throws Exception {
    String realImagePath = FileConst.IMAGE_SAVE_DIR + imagePath;

    Path filePath = Paths.get(realImagePath);

    if (!Files.exists(filePath)) {
      throw new Exception("File doesn't exist.");
    }

    String filename = filePath.getFileName().toString();
    byte[] bytes;

    if (FileUtil.isUnsupportedExt(filename)) {
      bytes = FileUtil.getByteArrayOfFormat(filePath.toFile(), FileConst.EXTENSION_JPEG);
    } else {
      bytes = Files.readAllBytes(filePath);
    }

    return bytes;
  }
  
  public Base64ResponseDTO getImageToBase64(String imagePath) throws Exception {
    String realImagePath = FileConst.IMAGE_SAVE_DIR + imagePath;

    Path filePath = Paths.get(realImagePath);

    if (!Files.exists(filePath)) {
      throw new Exception("File doesn't exist.");
    }

    String filename = filePath.getFileName().toString();
    String mimeType;
    byte[] bytes;

    if (FileUtil.isUnsupportedExt(filename)) {
      bytes = FileUtil.getByteArrayOfFormat(filePath.toFile(), FileConst.EXTENSION_JPEG);
      mimeType = FileConst.MIMETYPE_JPEG;
    } else {
      bytes = Files.readAllBytes(filePath);
      mimeType = FileUtil.getMimeType(filename);
    }

    String base64Str = FileUtil.convertImageToBase64(bytes);
    return new Base64ResponseDTO(base64Str, mimeType, filename);
  }
}
