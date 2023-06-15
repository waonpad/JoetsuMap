package com.joetsumap.common.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@MappedSuperclass
@Data
public class BaseEntity {

  @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
  @NotNull
  private LocalDateTime createdAt;

  @Column(name = "updated_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
  @NotNull
  private LocalDateTime updatedAt;

  @PrePersist
  public void preInsert() {
    LocalDateTime date = LocalDateTime.now();
    setCreatedAt(date);
    setUpdatedAt(date);
  }

  @PreUpdate
  public void preUpdate() {
    LocalDateTime date = LocalDateTime.now();
    setUpdatedAt(date);
  }

}