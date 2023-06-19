package com.joetsumap.domain.travelspot.entity;

import java.util.ArrayList;
import java.util.List;

import com.joetsumap.common.entity.BaseEntity;
import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import com.joetsumap.domain.user.entity.User;

@Entity
@Data
@Table(name = "travel_spots", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "address"),
      @UniqueConstraint(columnNames = "tel")
    })
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelSpot extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @NotBlank
  private String name;

  @Column(nullable = false)
  @NotBlank
  private String address;

  @Column(nullable = false)
  @NotBlank
  @Size(max = 21)
  private String tel;

  @Column(nullable = false)
  @NotBlank
  private ETravelSpotType type;

  @Column(nullable = false)
  @NotBlank
  private List<String> photos = new ArrayList<>();

  @Column(nullable = false)
  @NotBlank
  private double latitude;

  @Column(nullable = false)
  @NotBlank
  private double longitude;

  @OneToMany(mappedBy = "travelSpot", fetch = FetchType.LAZY)
  private List<ModelCourseTravelSpot> modelCourseTravelSpots = new ArrayList<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id")
  private User author;
}
