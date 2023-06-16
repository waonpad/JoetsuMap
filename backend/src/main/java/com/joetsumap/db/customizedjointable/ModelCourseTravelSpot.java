package com.joetsumap.db.customizedjointable;

import com.joetsumap.domain.modelcourse.entity.ModelCourse;
import com.joetsumap.domain.travelspot.entity.TravelSpot;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "model_course_travel_spot")
@EqualsAndHashCode(exclude= {"modelCourse", "travelSpot"})
public class ModelCourseTravelSpot {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "model_course_id")
  private ModelCourse modelCourse;

  @NotNull
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "travel_spot_id")
  private TravelSpot travelSpot;

  @Column(nullable = false)
  @NotNull
  @Min(1)
  private Number spot_order;
}