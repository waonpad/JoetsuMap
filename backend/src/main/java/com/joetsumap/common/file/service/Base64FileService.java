package com.joetsumap.common.file.service;

import java.io.ByteArrayInputStream;

import com.joetsumap.common.file.constant.FileConst;
import com.joetsumap.common.file.dto.Base64ResponseDTO;
import com.joetsumap.common.file.util.FileUtil;
import com.joetsumap.exception.exception.FileUploadException;
import jakarta.transaction.Transactional;

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
    try {
      byte[] imageBytes = Base64.getDecoder().decode(base64Image);

      // 画像の縦横を取得
      int[] imageWidthAndHeight = FileUtil.getImageWidthAndHeight(imageBytes);

      // 簡易的に、ファイル名に縦横を付与
      String fileName = UUID.randomUUID().toString() + "-width-" + imageWidthAndHeight[0] + "-height-"
          + imageWidthAndHeight[1] + "-" + FileConst.IMAGE_SAVE_FORMAT;

      // 保存先のディレクトリを指定
      String realSaveDir = FileConst.IMAGE_SAVE_DIR + saveDir;

      Path destinationFile = Path.of(realSaveDir + fileName);
      Files.copy(
        new ByteArrayInputStream(imageBytes),
        destinationFile,
        StandardCopyOption.REPLACE_EXISTING
      );

      return saveDir + fileName;
    } catch (Exception e) {
      e.printStackTrace();

      throw new FileUploadException();

      // NOTE: ディレクトリが無いとエラーになるので、新しく必要な場合は作成して.gitkeepを配置する
    }
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
