package com.joetsumap.domain.user.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class UserResponse {

  private Long id;

  private String username;

  private String email;

  private List<String> roles;
  
}
