package com.joetsumap.domain.modelcourse.entity;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.joetsumap.common.entity.BaseEntity;
import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot;

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

  @Column(nullable = false)
  @NotBlank
  private String title;

  @OneToMany(mappedBy = "modelCourse", fetch = FetchType.LAZY)
  private List<ModelCourseTravelSpot> modelCourseTravelSpots = new ArrayList<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id")
  private User author;

  // NOTICE: 未検証
  public void setTravelSpots(List<TravelSpot> travelSpots) {
    modelCourseTravelSpots.clear();

    for (int i = 0; i < travelSpots.size(); i++) {
      modelCourseTravelSpots.add(new ModelCourseTravelSpot(this, travelSpots.get(i), i + 1));
    }
  }

  // NOTICE: 未検証
  public List<TravelSpot> getTravelSpots() {
    return modelCourseTravelSpots.stream()
        .sorted(Comparator.comparingInt(ModelCourseTravelSpot::getSpotOrder))
        .map(ModelCourseTravelSpot::getTravelSpot)
        .collect(Collectors.toList());
  }
}
