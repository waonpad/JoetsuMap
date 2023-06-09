package com.joetsumap.domain.user.payload.response;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class JwtResponse {
  
  private String token;

  private UserResponse user;
  
}
