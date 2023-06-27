package com.joetsumap.domain.notification.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.notification.entity.Notification;
import com.joetsumap.domain.notification.payload.response.NotificationDTO;
import com.joetsumap.domain.notification.payload.response.NotificationListResponse;
import com.joetsumap.domain.notification.repository.NotificationRepository;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.domain.user.entity.User;
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

  public NotificationListResponse findMy(UserDetailsImpl userDetails) {

    // TODO: 本来はユーザーIDを元に取得
    List<Notification> notification = notificationRepository.findAll();

    List<NotificationDTO> notificationDTOList = notification.stream().map(NotificationDTO::new).toList();

    return new NotificationListResponse(notificationDTOList);
  }

  public void read(UserDetailsImpl userDetails, Long id) {

    Notification notification = notificationRepository.findById(id).get();

    // Update Entity Logic Here ...
  }

  public void readAll(UserDetailsImpl userDetails) {

    List<Notification> notification = notificationRepository.findAll();

    // Update Entity Logic Here ...

  }

  public void saveToken(UserDetailsImpl userDetails, String token) {

    User user = userRepository.findById(userDetails.getUser().getId()).get();

    user.setExpoPushToken(token);

    userRepository.save(user);
  }

  // 通知を送信するメソッド
  public void sendNotification(UserDetailsImpl sender, String token, String title, String message, Map<String, Object> data) throws PushClientException {
    // TODO: 送信したら、出たーベースに保存する
    
    if (!PushClient.isExponentPushToken(token)) throw new Error("Token:" + token + " is not a valid token.");

    ExpoPushMessage expoPushMessage = new ExpoPushMessage();
    expoPushMessage.getTo().add(token);
    expoPushMessage.setTitle(title);
    expoPushMessage.setBody(message);
    expoPushMessage.setData(data);

    List<ExpoPushMessage> expoPushMessages = new ArrayList<>();
    expoPushMessages.add(expoPushMessage);

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

    /**
     // Countdown 30s
     int wait = 30;
     for (int i = wait; i >= 0; i--) {
     System.out.print("Waiting for " + wait + " seconds. " + i + "s\r");
     Thread.sleep(1000);
     }
     System.out.println("Fetching reciepts...");

     List<String> ticketIds = (client.getTicketIdsFromPairs(okTicketMessages));
     CompletableFuture<List<ExpoPushReceipt>> receiptFutures = client.getPushNotificationReceiptsAsync(ticketIds);

     List<ExpoPushReceipt> receipts = new ArrayList<>();
     try {
     receipts = receiptFutures.get();
     } catch (ExecutionException | InterruptedException e) {
     e.printStackTrace();
     }

     System.out.println("Recieved " + receipts.size() + " receipts:");

     for (ExpoPushReceipt reciept : receipts) {
     System.out.println("Receipt for id: " + reciept.getId() + " had status: " + reciept.getStatus());
     }
     */
  }
}
