package com.joetsumap.domain.user.payload.response;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class UserPageResponse {
  
  private Page<UserDTO> users;
}
