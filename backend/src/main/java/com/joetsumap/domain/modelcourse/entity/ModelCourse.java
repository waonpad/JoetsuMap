package com.joetsumap.domain.modelcourse.entity;

import java.util.ArrayList;
import java.util.List;

import com.joetsumap.common.entity.BaseEntity;
import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot.entity.ModelCourseTravelSpot;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import com.joetsumap.domain.user.entity.User;

@Entity
@Data
@Table(name = "model_courses")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
@ToString(exclude = {"author", "modelCourseTravelSpots", "bookmarkedUsers"})
public class ModelCourse extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @NotBlank
  private String title;

  @OneToMany(mappedBy = "modelCourse", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @OrderBy("spotOrder ASC") // 追加
  private List<ModelCourseTravelSpot> modelCourseTravelSpots = new ArrayList<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id")
  private User author;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "bookmarked_model_courses",
      joinColumns = @JoinColumn(name = "model_course_id"),
      inverseJoinColumns = @JoinColumn(name = "user_id"))
  private List<User> bookmarkedUsers = new ArrayList<>();
}
