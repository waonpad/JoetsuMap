package com.joetsumap.domain.role.entity;

import java.util.ArrayList;
import java.util.List;

import com.joetsumap.common.entity.BaseEntity;
import com.joetsumap.domain.user.entity.User;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@Table(name = "roles")
@EqualsAndHashCode(callSuper=false)
public class Role extends BaseEntity {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column(length = 20, nullable = false)
  private ERole name;

  // @ManyToMany(fetch = FetchType.LAZY)
  // @JoinTable(  name = "user_roles", 
  //       joinColumns = @JoinColumn(name = "role_id"), 
  //       inverseJoinColumns = @JoinColumn(name = "user_id"))
  // private List<User> users = new ArrayList<>();

}