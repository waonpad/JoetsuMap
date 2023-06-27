package com.joetsumap.db.migration.service.logic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.notification.entity.Notification;
import com.joetsumap.domain.notification.repository.NotificationRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.repository.UserRepository;

@Service
public class NotificationMigrateLogic {
  
  @Autowired
  NotificationRepository notificationRepository;

  @Autowired
  UserRepository userRepository;

  public void migrate() {
    
    Integer notificationCount = 300;

    List<User> users = userRepository.findAll();

    Integer existNotificationCount = notificationRepository.findAll().size();

    List<Notification> notifications = new ArrayList<>();

    for (int i = existNotificationCount + 1; i <= notificationCount; i++) {

      Notification notification = new Notification();

      // tokenをUUIDで生成する
      String token = java.util.UUID.randomUUID().toString();
      notification.setRecipientToken(token);

      User recipient = users.get((int) (Math.random() * users.size()));

      User sender = null;
      while (sender == null || recipient.getId() == sender.getId()) {
        sender = users.get((int) (Math.random() * users.size()));
      }

      notification.setRecipient(recipient);
      notification.setSender(sender);

      notification.setTitle(sender.getUsername() + "さんからの通知");

      notification.setBody(sender.getUsername() + "さんとすれ違いました。");

      notification.setIsRead(false);

      notifications.add(notification);
    }

    if (notifications.size() > 0) {
      notificationRepository.saveAll(notifications);

      System.out.println("通知情報のマイグレーションが完了しました。" + (notificationCount - existNotificationCount) + "件のデータを登録しました。");
    } else {
      System.out.println("通知情報のマイグレーションは不要です。");
    }
  }
}
