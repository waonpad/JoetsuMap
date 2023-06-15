package com.joetsumap.domain.travelspot.entity;

import java.util.ArrayList;
import java.util.List;

import com.joetsumap.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import com.joetsumap.domain.modelcourse.entity.ModelCourse;
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

  @NotBlank
  private String name;

  @NotBlank
  private String address;

  @NotBlank
  @Size(max = 50)
  // ほんとにString？
  private String tel;

  @NotBlank
  private ETravelSpotType type;

  @NotBlank
  private List<String> photos = new ArrayList<>();

  @NotBlank
  private double latitude;

  @NotBlank
  private double longitude;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "model_course_travel_spot",
      joinColumns = @JoinColumn(name = "travel_spot_id"),
      inverseJoinColumns = @JoinColumn(name = "model_course_id"))
  private List<ModelCourse> modelCourses = new ArrayList<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id")
  private User author;
}
