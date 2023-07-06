package com.joetsumap.domain.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.payload.request.LoginRequest;
import com.joetsumap.domain.user.payload.request.RegisterRequest;
import com.joetsumap.domain.user.payload.response.JwtResponse;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.domain.user.payload.response.UserResponse;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.security.services.UserDetailsImpl;
import com.joetsumap.domain.user.service.logic.AuthLogic;
import com.joetsumap.exception.exception.AlreadyExistsException;
import com.joetsumap.exception.exception.NotFoundException;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class AuthService {

  @Autowired
  AuthLogic authLogic;

  @Autowired
  UserRepository userRepository;
  
  /**
   * ログインするロジックを呼び出す
   */
  public JwtResponse login(LoginRequest loginRequest) {

    return authLogic.login(loginRequest.getUsername(), loginRequest.getPassword());
  }

  /**
   * ユーザーを作成してログインする
   */
  public JwtResponse register(RegisterRequest registerRequest) {

    // ユーザーが既に存在するかどうかを確認する
    boolean exists = authLogic.existsUserCheck(registerRequest.getUsername(), registerRequest.getPassword());

    // 既に存在する場合はエラーをスローする
    if (exists) {
      throw new AlreadyExistsException();
    }

    // ユーザーを作成する
    authLogic.createUser(registerRequest);

    // ユーザーを作成した後、ログインする
    return authLogic.login(registerRequest.getUsername(), registerRequest.getPassword());
  }

  /**
   * ログインユーザーの情報を取得する
   */
  public UserResponse getMe(UserDetailsImpl userDetails) {
    
    // ユーザーが存在しない場合はnullを返す
    if (userDetails == null) {
      return null;
    }

    User user = userRepository.findById(userDetails.getUser().getId()).orElseThrow(
      () -> new NotFoundException()
    );

    UserDTO userDTO = new UserDTO(user);
    userDTO.setRoles(user.getRoles().stream().map(role -> role.getName()).toList());

    return new UserResponse(userDTO);
  }
}
