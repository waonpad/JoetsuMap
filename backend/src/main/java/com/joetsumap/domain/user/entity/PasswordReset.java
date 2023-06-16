package com.joetsumap.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.joetsumap.common.entity.BaseEntity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "password_resets")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class PasswordReset extends BaseEntity {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @Column(nullable = false)
  @NotBlank
  @Size(max = 120)
  @JsonIgnore
  private String token;
}
