package com.joetsumap.domain.modelcourse.entity;

import java.util.ArrayList;
import java.util.List;

import com.joetsumap.common.entity.BaseEntity;
import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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

  @Column(nullable = false)
  @NotBlank
  private String title;

  @OneToMany(mappedBy = "modelCourse", fetch = FetchType.LAZY)
  private List<ModelCourseTravelSpot> modelCourseTravelSpots = new ArrayList<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id")
  private User author;
}
