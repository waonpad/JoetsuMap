package com.joetsumap.db.migration.service.logic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.role.entity.Role;
import com.joetsumap.domain.role.repository.RoleRepository;

@Service
public class RoleMigrateLogic {

  @Autowired
  private RoleRepository roleRepository;
  
  public void migrate() {
    
    // ロールのマイグレーション
    List<Role> roles = new ArrayList<>();

    Arrays.asList(ERole.values()).forEach(name -> {
      Optional<Role> targetRole = roleRepository.findByName(name);
      if (!targetRole.isPresent()) {
          Role role = new Role();
          role.setName(name);
          roles.add(role);
      }
    });
    
    if (roles.size() > 0) {
      roleRepository.saveAll(roles);

      System.out.println("ロールのマイグレーションが完了しました。" + roles.size() + "件のロールを追加しました。");
    } else {
      System.out.println("ロールのマイグレーションは不要です。");
    }
  }
}
