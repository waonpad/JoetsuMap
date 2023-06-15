package com.joetsumap.domain.user.payload.response;

import java.util.List;

import com.joetsumap.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class UserListResponse {
  
  private List<User> users;
}
