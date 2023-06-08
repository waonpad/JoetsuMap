package com.joetsumap.role.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.role.entity.ERole;
import com.joetsumap.role.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
