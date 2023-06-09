package com.joetsumap.domain.user.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.common.payload.response.MessageResponse;
import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.role.entity.Role;
import com.joetsumap.domain.role.repository.RoleRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.payload.request.LoginRequest;
import com.joetsumap.domain.user.payload.request.RegisterRequest;
import com.joetsumap.domain.user.payload.response.JwtResponse;
import com.joetsumap.domain.user.payload.response.UserResponse;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.security.jwt.JwtUtils;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.common.constant.ApiPathConst.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(API_AUTH_PREFIX)
public class AuthController {
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

  @PostMapping(API_AUTH_LOGIN)
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    UserResponse userResponse = new UserResponse(
        userDetails.getUser().getId(), 
        userDetails.getUsername(), 
        userDetails.getUser().getEmail(),
        roles);

    JwtResponse jwtResponse = new JwtResponse(jwt, userResponse);

    return ResponseEntity.ok(jwtResponse);
  }

  @PostMapping(API_AUTH_REGISTER)
  public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(null, signUpRequest.getUsername(),
        signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()), null);

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

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
        new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(), signUpRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    List<String> strRoles2 = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    UserResponse userResponse = new UserResponse(
        userDetails.getUser().getId(), 
        userDetails.getUsername(), 
        userDetails.getUser().getEmail(),
        strRoles2);

    JwtResponse jwtResponse = new JwtResponse(jwt, userResponse);

    return ResponseEntity.ok(jwtResponse);
  }

  @GetMapping(API_AUTH_ME)
  public ResponseEntity<?> getMe(Authentication authentication) {
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    UserResponse userResponse = new UserResponse(
        userDetails.getUser().getId(), 
        userDetails.getUsername(), 
        userDetails.getUser().getEmail(),
        roles);

    return ResponseEntity.ok(userResponse);
  }
}
