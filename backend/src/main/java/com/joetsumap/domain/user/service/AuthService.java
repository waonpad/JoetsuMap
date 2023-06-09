package com.joetsumap.domain.user.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.joetsumap.common.payload.response.MessageResponse;
import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.role.entity.Role;
import com.joetsumap.domain.role.repository.RoleRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.payload.request.LoginRequest;
import com.joetsumap.domain.user.payload.request.RegisterRequest;
import com.joetsumap.domain.user.payload.response.JwtResponse;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.security.jwt.JwtUtils;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class AuthService {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;
  
  public JwtResponse login(LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    JwtResponse jwtResponse = new JwtResponse(jwt, userDetails.getUser());

    return jwtResponse;
  }

  public boolean existsByUsername(String username) {
    return userRepository.existsByUsername(username);
  }

  public boolean existsByEmail(String email) {
    return userRepository.existsByEmail(email);
  }

  public JwtResponse register(RegisterRequest registerRequest) {

    // if (userRepository.existsByUsername(registerRequest.getUsername())) {
    //   return ResponseEntity
    //       .badRequest()
    //       .body(new MessageResponse("Error: Username is already taken!"));
    // }

    // if (userRepository.existsByEmail(registerRequest.getEmail())) {
    //   return ResponseEntity
    //       .badRequest()
    //       .body(new MessageResponse("Error: Email is already in use!"));
    // }

    // Create new user's account
    User user = new User(null, registerRequest.getUsername(), registerRequest.getEmail(),
        encoder.encode(registerRequest.getPassword()), null);

    List<String> strRoles = registerRequest.getRole();
    List<Role> roles = new ArrayList<>();

    // ロール付与処理も分ける
    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
        case "mod":
          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);

          break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    // 登録だけしてログインはしない場合
    // return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

    // 登録とログインを同時に行う場合
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(registerRequest.getUsername(), registerRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    JwtResponse jwtResponse = new JwtResponse(jwt, userDetails.getUser());

    return jwtResponse;
  }
}
