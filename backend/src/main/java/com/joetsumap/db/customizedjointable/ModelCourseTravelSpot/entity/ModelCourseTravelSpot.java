package com.joetsumap.db.customizedjointable.ModelCourseTravelSpot.entity;

import com.joetsumap.domain.modelcourse.entity.ModelCourse;
import com.joetsumap.domain.travelspot.entity.TravelSpot;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Table(name = "model_course_travel_spot")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
@ToString(exclude = {"modelCourse", "travelSpot"})
public class ModelCourseTravelSpot {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "model_course_id")
  private ModelCourse modelCourse;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "travel_spot_id")
  private TravelSpot travelSpot;

  @Column(nullable = false)
  @NotNull
  @Min(0)
  private Integer spotOrder;
}