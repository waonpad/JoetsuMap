package com.joetsumap.domain.user.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {

  private UserDTO user;
}