package com.joetsumap.domain.passing.entity;

import java.util.List;

import com.joetsumap.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import com.joetsumap.domain.user.entity.User;

@Entity
@Data
@Table(name = "passings")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class Passing extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
    name = "passing_users",
    joinColumns = @JoinColumn(name = "passing_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id")
  )
  private List<User> users;
}