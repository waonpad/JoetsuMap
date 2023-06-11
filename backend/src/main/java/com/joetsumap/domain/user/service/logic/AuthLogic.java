package com.joetsumap.domain.user.service.logic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.role.entity.Role;
import com.joetsumap.domain.role.repository.RoleRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.payload.request.RegisterRequest;
import com.joetsumap.domain.user.payload.response.JwtResponse;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.security.jwt.JwtUtils;
import com.joetsumap.security.services.UserDetailsImpl;

@Service
public class AuthLogic {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  PasswordEncoder encoder;

  public void createUser(RegisterRequest registerRequest) {

    User user = new User(null, registerRequest.getUsername(), registerRequest.getEmail(),
      encoder.encode(registerRequest.getPassword()), null);

    List<String> strRoles = registerRequest.getRole();

    addRole(user, strRoles);
  }

  public void addRole(User user, List<String> strRoles) {

    List<Role> roles = new ArrayList<>();

    String exceptionMessage = "Error: Role is not found.";
    
    if (strRoles == null || strRoles.isEmpty()) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException(exceptionMessage));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        Role userRole = roleRepository.findByName(ERole.valueOf(role))
            .orElseThrow(() -> new RuntimeException(exceptionMessage));
        roles.add(userRole);
      });
    }

    // 重複を削除
    roles.stream().distinct();

    user.setRoles(roles);
    userRepository.saveAndFlush(user);
  }

  public JwtResponse login(String username, String password) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(username, password));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    return new JwtResponse(jwt, userDetails.getUser());
  }

  public void existsUserCheck(String username, String email) {

    if (userRepository.existsByUsername(username)) {
      throw new RuntimeException("Error: Username is already taken!");
    }

    if (userRepository.existsByEmail(email)) {
      throw new RuntimeException("Error: Email is already in use!");
    }
  }
}
