package com.joetsumap.domain.modelcourse.entity;

import java.util.ArrayList;
import java.util.List;

import com.joetsumap.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.user.entity.User;

@Entity
@Data
@Table(name = "model_courses")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ModelCourse extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String title;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "model_course_travel_spot",
      joinColumns = @JoinColumn(name = "model_course_id"),
      inverseJoinColumns = @JoinColumn(name = "travel_spot_id"))
  private List<TravelSpot> travelSpots = new ArrayList<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id")
  private User author;
}
