package com.joetsumap.domain.user.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletDTO;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.payload.request.LoginRequest;
import com.joetsumap.domain.user.payload.request.RegisterRequest;
import com.joetsumap.domain.user.payload.response.JwtResponse;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.domain.user.payload.response.UserResponse;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.security.services.UserDetailsImpl;
import com.joetsumap.domain.user.service.logic.AuthLogic;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class AuthService {

  @Autowired
  AuthLogic authLogic;

  @Autowired
  UserRepository userRepository;
  
  public JwtResponse login(LoginRequest loginRequest) {

    return authLogic.login(loginRequest.getUsername(), loginRequest.getPassword());
  }

  public JwtResponse register(RegisterRequest registerRequest) {

    authLogic.existsUserCheck(registerRequest.getUsername(), registerRequest.getPassword());

    authLogic.createUser(registerRequest);

    return authLogic.login(registerRequest.getUsername(), registerRequest.getPassword());
  }

  public UserResponse getMe(UserDetailsImpl userDetails) {
    
    if (userDetails == null) {
      return null;
    }

    User user = userRepository.findById(userDetails.getUser().getId()).get();

    UserDTO userDTO = new UserDTO(user);

    List<TravelBookletDTO> travelBooklets = new ArrayList<>();
    for (TravelBooklet travelBooklet : user.getTravelBooklets()) {
      travelBooklets.add(new TravelBookletDTO(travelBooklet));
    }

    userDTO.setTravelBooklets(travelBooklets);

    UserResponse userResponse = new UserResponse(userDTO);
    return userResponse;
  }
}
