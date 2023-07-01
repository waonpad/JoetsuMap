package com.joetsumap.domain.notification.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.notification.entity.Notification;
import com.joetsumap.domain.notification.payload.response.NotificationDTO;
import com.joetsumap.domain.notification.payload.response.NotificationPageResponse;
import com.joetsumap.domain.notification.repository.NotificationRepository;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.security.services.UserDetailsImpl;

import io.github.jav.exposerversdk.ExpoPushMessage;
import io.github.jav.exposerversdk.ExpoPushMessageTicketPair;
import io.github.jav.exposerversdk.ExpoPushTicket;
import io.github.jav.exposerversdk.PushClient;
import io.github.jav.exposerversdk.PushClientException;
import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class NotificationService {

  @Autowired
  NotificationRepository notificationRepository;

  @Autowired
  UserRepository userRepository;

  /**
   * ログインユーザーに対する通知情報を取得する
   */
  public NotificationPageResponse findMy(UserDetailsImpl userDetails, Pageable pageable) {

    Page<Notification> notifications = notificationRepository.findByRecipientId(userDetails.getUser().getId(), pageable);

    Page<NotificationDTO> notificationDTOPage = notifications.map(notification -> {
      NotificationDTO notificationDTO = new NotificationDTO(notification);
      notificationDTO.setSender(new UserDTO(notification.getSender()));

      return notificationDTO;
    });

    return new NotificationPageResponse(notificationDTOPage);
  }

  /**
   * 通知を既読にする
   */
  public void read(UserDetailsImpl userDetails, Long id) {

    Notification notification = notificationRepository.findById(id).get();

    notification.setIsRead(true);

    notificationRepository.saveAndFlush(notification);
  }

  /**
   * 通知を全て既読にする
   */
  public void readAll(UserDetailsImpl userDetails) {

    List<Notification> notifications = notificationRepository.findAll();

    notifications.forEach(n -> n.setIsRead(true));

    notificationRepository.saveAllAndFlush(notifications);
  }

  /**
   * プッシュ通知を受け取るためのトークンを保存する
   */
  public void saveToken(UserDetailsImpl userDetails, String token) {

    User user = userRepository.findById(userDetails.getUser().getId()).get();

    user.setExpoPushToken(token);

    userRepository.save(user);
  }

  /**
   * データベースに通知を保存して、プッシュ通知を送信する
   */
  public void sendNotification(UserDetailsImpl sender, User recipient, String title, String message, Map<String, Object> data) throws PushClientException {
    
    String token = recipient.getExpoPushToken();

    // データベースに通知情報を保存する
    // NOTICE: 工数削減のため、詳細データは扱わない
    Notification notification = new Notification();
    notification.setRecipientToken(token);
    notification.setTitle(title);
    notification.setBody(message);
    notification.setIsRead(false);
    notification.setSender(sender.getUser());
    notification.setRecipient(recipient);

    notificationRepository.save(notification);

    // トークンがExpoのトークンかどうかをチェックする
    if (!PushClient.isExponentPushToken(token)) throw new Error("Token:" + token + " is not a valid token.");

    // プッシュ通知用の通知情報を作成する
    ExpoPushMessage expoPushMessage = new ExpoPushMessage();
    expoPushMessage.getTo().add(token);
    expoPushMessage.setTitle(title);
    expoPushMessage.setBody(message);
    expoPushMessage.setData(data);

    // プッシュ通知用のリストを作成する
    List<ExpoPushMessage> expoPushMessages = new ArrayList<>();
    expoPushMessages.add(expoPushMessage);

    // プッシュ通知を送信する
    PushClient client = new PushClient();
    List<List<ExpoPushMessage>> chunks = client.chunkPushNotifications(expoPushMessages);

    List<CompletableFuture<List<ExpoPushTicket>>> messageRepliesFutures = new ArrayList<>();

    for (List<ExpoPushMessage> chunk : chunks) {
        messageRepliesFutures.add(client.sendPushNotificationsAsync(chunk));
    }

    // Wait for each completable future to finish
    List<ExpoPushTicket> allTickets = new ArrayList<>();
    for (CompletableFuture<List<ExpoPushTicket>> messageReplyFuture : messageRepliesFutures) {
        try {
            allTickets.addAll(messageReplyFuture.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }

    List<ExpoPushMessageTicketPair<ExpoPushMessage>> zippedMessagesTickets = client.zipMessagesTickets(expoPushMessages, allTickets);

    List<ExpoPushMessageTicketPair<ExpoPushMessage>> okTicketMessages = client.filterAllSuccessfulMessages(zippedMessagesTickets);
    String okTicketMessagesString = okTicketMessages.stream().map(p -> "Title: " + p.message.getTitle() + ", Id:" + p.ticket.getId()).collect(Collectors.joining(","));
    System.out.println("Recieved OK ticket for " + okTicketMessages.size() + " messages: " + okTicketMessagesString);

    List<ExpoPushMessageTicketPair<ExpoPushMessage>> errorTicketMessages = client.filterAllMessagesWithError(zippedMessagesTickets);
    String errorTicketMessagesString = errorTicketMessages.stream().map(p -> "Title: " + p.message.getTitle() + ", Error: " + p.ticket.getDetails().getError()).collect(Collectors.joining(","));
    System.out.println("Recieved ERROR ticket for " + errorTicketMessages.size() + " messages: " + errorTicketMessagesString);
  }
}
