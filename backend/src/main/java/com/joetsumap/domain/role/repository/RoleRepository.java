package com.joetsumap.domain.role.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.role.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
