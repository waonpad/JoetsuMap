package com.joetsumap.common.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@MappedSuperclass
@Data
// これを付けると、JSONで循環参照が発生したときに、
// そのオブジェクトのIDだけをJSONに出力するようになる。
// 例 : {"_id":12345,"name":"user1","roles":[{"_id":67890,"name":"ROLE_USER"}, users: ["12345"]}]}
@JsonIdentityInfo(generator = ObjectIdGenerators.UUIDGenerator.class)
// @JsonIdentityReference(alwaysAsId = true)
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