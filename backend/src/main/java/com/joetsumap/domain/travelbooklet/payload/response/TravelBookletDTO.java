package com.joetsumap.domain.travelbooklet.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;
import com.joetsumap.domain.user.payload.response.UserDTO;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelBookletDTO {

  private Long id;

  private String title;

  private String text;

  private String photo;

  private UserDTO author;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  public TravelBookletDTO(TravelBooklet travelBooklet, UserDTO author) {
    this.id = travelBooklet.getId();
    this.title = travelBooklet.getTitle();
    this.text = travelBooklet.getText();
    this.photo = travelBooklet.getPhoto();
    this.author = author;
    this.createdAt = travelBooklet.getCreatedAt();
    this.updatedAt = travelBooklet.getUpdatedAt();
  }

  public TravelBookletDTO(TravelBooklet travelBooklet) {
    this(travelBooklet, null);
  }
}
