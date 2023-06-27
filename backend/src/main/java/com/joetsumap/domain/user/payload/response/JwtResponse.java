package com.joetsumap.domain.user.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class JwtResponse {
  
  private String token;

  private UserDTO user;
  
}
