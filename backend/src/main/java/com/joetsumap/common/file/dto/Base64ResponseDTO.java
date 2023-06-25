package com.joetsumap.common.file.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Base64ResponseDTO {

  private String base64Str;
  private String mimeType;
  private String filename;
}