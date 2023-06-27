package com.joetsumap.domain.notification.payload.response;

import java.time.LocalDateTime;

import com.joetsumap.domain.notification.entity.Notification;
import com.joetsumap.domain.user.payload.response.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class NotificationDTO {
  
  private Long id;

  private String recipientToken;

  private String title;

  private String body;

  private Boolean isRead;

  private UserDTO sender;

  private UserDTO recipient;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  public NotificationDTO(Notification notification, UserDTO sender, UserDTO recipient) {
    this.id = notification.getId();
    this.recipientToken = notification.getRecipientToken();
    this.title = notification.getTitle();
    this.body = notification.getBody();
    this.isRead = notification.getIsRead();
    this.sender = sender;
    this.recipient = recipient;
    this.createdAt = notification.getCreatedAt();
    this.updatedAt = notification.getUpdatedAt();
  }

  public NotificationDTO(Notification notification) {
    this(notification, null, null);
  }
}
