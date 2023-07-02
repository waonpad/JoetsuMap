package com.joetsumap.db.migration.service.logic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.role.entity.Role;
import com.joetsumap.domain.role.repository.RoleRepository;
import com.joetsumap.domain.user.constant.UserConst;

import com.joetsumap.common.file.constant.FileConst;

@Service
public class UserMigrateLogic {
  
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  public User migrateAdmin() {
    
    // 管理者のマイグレーション

    String username = "admin";

    // 存在確認。存在していたらエンティティを返す。
    User admin = userRepository.findByUsername(username).orElse(null);

    if (admin != null) {
      System.out.println("管理者のマイグレーションは不要です。");
      return admin;
    }

    List<Role> roles = new ArrayList<>();

    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Role is not found."));

    roles.add(adminRole);

    User user = new User();
    user.setUsername(username);
    user.setEmail("admin@example.com");
    user.setPassword(encoder.encode("adminpassword"));
    user.setIcon(UserConst.ICON_SAVE_DIR + "user-icon-width-500-height-500-sample" + FileConst.IMAGE_SAVE_FORMAT);
    user.setRoles(roles);

    userRepository.save(user);

    System.out.println("管理者のマイグレーションが完了しました。");

    return user;
  }

  public void migrate() {
    
    // ユーザーのマイグレーション

    Integer userCount = 100;

    Integer existUserCount = userRepository.findAll().size();

    // ロールを事前に付与しておく
    List<Role> roles = new ArrayList<>();

    Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Role is not found."));

    roles.add(userRole);

    List<User> users = new ArrayList<>();

    for (int i = existUserCount + 1; i <= userCount; i++) {
      String counter = String.format("%03d", i);

      User user = new User();
      user.setUsername("user" + counter);
      user.setEmail("user" + counter + "@example.com");
      user.setPassword(encoder.encode("password" + counter));
      user.setIcon(UserConst.ICON_SAVE_DIR + "user-icon-width-500-height-500-sample" + FileConst.IMAGE_SAVE_FORMAT);
      user.setRoles(roles);

      users.add(user);
    }

    if (users.size() > 0) {
      userRepository.saveAll(users);

      System.out.println("ユーザーのマイグレーションが完了しました。" + users.size() + "件のユーザーを追加しました。");
    } else {
      System.out.println("ユーザーのマイグレーションは不要です。");
    }
  }
}
