package com.joetsumap.domain.passing.payload.response;

import java.time.LocalDateTime;

import com.joetsumap.domain.passing.entity.Passing;
import com.joetsumap.domain.user.entity.User;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class PassingDTO {

  @Id
  @NotNull
  private Long id;

  @NotNull
  private User passedUser;

  @NotNull
  private LocalDateTime createdAt;

  @NotNull
  private LocalDateTime updatedAt;
  
  public PassingDTO(Passing passing, Long id) {
    this.id = passing.getId();
    this.passedUser = passing.getUser1().getId().equals(id) ? passing.getUser2() : passing.getUser1();
    this.createdAt = passing.getCreatedAt();
    this.updatedAt = passing.getUpdatedAt();
  }

}
