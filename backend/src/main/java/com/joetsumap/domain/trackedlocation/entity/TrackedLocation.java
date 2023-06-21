package com.joetsumap.domain.trackedlocation.entity;

import com.joetsumap.common.entity.BaseEntity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import com.joetsumap.domain.user.entity.User;

@Entity
@Data
@Table(name = "tracked_locations")
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TrackedLocation extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @NotNull
  private double latitude;

  @NotNull
  private double longitude;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id")
  private User author;
}
