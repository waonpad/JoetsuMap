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
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class UserService {

  @Autowired
  UserRepository userRepository;

  public UserListResponse findAll() {

    List<User> users = userRepository.findAll();

    // userをUserDTOに変換する
    List<UserDTO> userDTOList = users.stream().map(user -> new UserDTO(user)).toList();

    return new UserListResponse(userDTOList);
  }

  public UserResponse findById(Long id) {

    User user = userRepository.findById(id).get();

    return new UserResponse(new UserDTO(user));
  }

  public UserResponse updateProfile(UserDetailsImpl userDetails, UpdateProfileRequest updateRequest, Long id) {

    User user = userRepository.findById(id).get();

    // Update Entity Logic Here ...

    return new UserResponse(new UserDTO(user));
  }

  public UserResponse delete(UserDetailsImpl userDetails, Long id) {

    User user = userRepository.findById(id).get();

    userRepository.delete(user);

    return new UserResponse(new UserDTO(user));
  }
}