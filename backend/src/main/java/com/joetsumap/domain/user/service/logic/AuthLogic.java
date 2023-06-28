package com.joetsumap.domain.user.service.logic;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.joetsumap.common.file.service.Base64FileService;
import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.role.entity.Role;
import com.joetsumap.domain.role.repository.RoleRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.payload.request.RegisterRequest;
import com.joetsumap.domain.user.payload.response.JwtResponse;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.security.jwt.JwtUtils;
import com.joetsumap.security.services.UserDetailsImpl;

import com.joetsumap.domain.user.constant.UserConst;

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

  @Autowired
  Base64FileService base64FileService;

  public void createUser(RegisterRequest registerRequest) {

    String iconFileName = base64FileService.uploadImageFromBase64(registerRequest.getIcon(), UserConst.ICON_SAVE_DIR);

    User user = new User();

    user.setUsername(registerRequest.getUsername());
    user.setEmail(registerRequest.getEmail());
    user.setPassword(encoder.encode(registerRequest.getPassword()));

    user.setIcon(iconFileName);

    List<String> strRoles = registerRequest.getRoles();

    // データベースへの反映はaddRoleメソッドで行っている
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

    UserDTO userDTO = new UserDTO(userDetails.getUser());
    userDTO.setRoles(userDetails.getUser().getRoles().stream().map(role -> role.getName()).toList());

    return new JwtResponse(jwt, userDTO);
  }

  public boolean existsUserCheck(String username, String email) {

    if (userRepository.existsByUsername(username)) {
      return true;
    }

    if (userRepository.existsByEmail(email)) {
      return true;
    }

    return false;
  }
}
