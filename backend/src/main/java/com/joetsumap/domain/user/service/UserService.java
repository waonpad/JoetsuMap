package com.joetsumap.domain.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.payload.request.UpdateProfileRequest;
import com.joetsumap.domain.user.payload.response.UserListResponse;
import com.joetsumap.domain.user.payload.response.UserResponse;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.error.constant.ExceptionMessageConst;
import com.joetsumap.security.services.UserDetailsImpl;
import com.joetsumap.error.util.ErrorUtil;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class UserService {

  @Autowired
  UserRepository userRepository;

  // /**
  //  * ユーザーを全件取得する
  //  */
  // public UserListResponse findAll() {

  //   List<User> users = userRepository.findAll();

  //   List<UserDTO> userDTOList = users.stream().map(user -> {
  //     UserDTO userDTO = new UserDTO(user);
  //     userDTO.setRoles(user.getRoles().stream().map(role -> role.getName()).toList());

  //     return userDTO;
  // }).toList();

  //   return new UserListResponse(userDTOList);
  // }

  /**
   * ユーザーをIDで取得する
   */
  public UserResponse findById(Long id) {

    User user = userRepository.findById(id).get();

    UserDTO userDTO = new UserDTO(user);
    userDTO.setRoles(user.getRoles().stream().map(role -> role.getName()).toList());

    return new UserResponse(userDTO);
  }

  /**
   * ユーザーのプロフィールを更新する
   */
  public UserResponse updateProfile(UserDetailsImpl userDetails, UpdateProfileRequest updateRequest, Long id) {

    if (true) {
      throw new RuntimeException("実装できていない");
    }

    User user = userRepository.findById(id).get();

    ErrorUtil.checkAuthorWithException(userDetails, user.getId());

    // ユーザーのプロフィールを更新する
    // TODO: データベースは更新できてもコンテキストが更新されない。パスワード入力無しでコンテキストを更新する方法が分からないので後でやる
    user.setUsername(updateRequest.getUsername() != null ? updateRequest.getUsername() : user.getUsername());

    UserDTO userDTO = new UserDTO(user);
    userDTO.setRoles(user.getRoles().stream().map(role -> role.getName()).toList());

    userRepository.saveAndFlush(user);

    return new UserResponse(userDTO);
  }
}