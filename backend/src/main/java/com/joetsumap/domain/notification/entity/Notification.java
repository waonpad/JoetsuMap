package com.joetsumap.domain.notification.entity;

// import java.util.Map;

import com.joetsumap.common.entity.BaseEntity;
import com.joetsumap.domain.user.entity.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@Table(name = "notifications")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
@ToString(exclude = {"sender", "recipient"})
public class Notification extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column // トークンが無くてもデータベースには保存できるように、nullable = trueにしておく
  private String recipientToken; // toが予約語なので、recipientTokenに変更

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String body;

  // TODO: Mapが使えないので、dataをどう保存するか考える・・・
  // @Column
  // private Map<String, Object> data;

  @Column(nullable = false)
  private Boolean isRead;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "sender_id")
  private User sender;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "recipient_id")
  private User recipient;
}
