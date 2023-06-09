package com.joetsumap.db.migration.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.role.entity.Role;
import com.joetsumap.domain.role.repository.RoleRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class DBMigrateService {
  
  @Autowired
  private RoleRepository roleRepository;

  public void migrate() {
    List<Role> roles = new ArrayList<>();

    Arrays.asList(ERole.values()).forEach(name -> {
      Optional<Role> targetRole = roleRepository.findByName(name);
      if (!targetRole.isPresent()) {
          Role role = new Role(null, name);
          roles.add(role);
      }
    });
    
    if (roles.size() > 0) {
      roleRepository.saveAll(roles);
    }
  }
}
