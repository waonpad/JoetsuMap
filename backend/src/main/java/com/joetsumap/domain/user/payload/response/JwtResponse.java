package com.joetsumap.domain.user.payload.response;

import com.joetsumap.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class JwtResponse {
  
  private String token;

  private User user;
  
}
