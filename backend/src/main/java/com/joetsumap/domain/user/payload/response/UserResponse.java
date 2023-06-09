package com.joetsumap.domain.user.payload.response;

import com.joetsumap.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {

  private User user;
}