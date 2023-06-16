package com.joetsumap.domain.user.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.joetsumap.common.entity.BaseEntity;
import com.joetsumap.domain.modelcourse.entity.ModelCourse;
import com.joetsumap.domain.notification.entity.Notification;
import com.joetsumap.domain.role.entity.Role;
import com.joetsumap.domain.trackedlocation.entity.TrackedLocation;
import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;
import com.joetsumap.domain.passing.entity.Passing;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email")
    })
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class User extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @NotBlank
  @Size(max = 20)
  private String username;

  @Column(nullable = false)
  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @Column(nullable = false)
  @NotBlank
  @Size(max = 120)
  @JsonIgnore
  private String password;

  @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
  private List<Role> roles = new ArrayList<>();

  @OneToMany(mappedBy = "author", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<TravelSpot> travelSpots = new ArrayList<>();

  @OneToMany(mappedBy = "author", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<ModelCourse> modelCourses = new ArrayList<>();

  @OneToMany(mappedBy = "author", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<TravelBooklet> travelBooklets = new ArrayList<>();

  @OneToMany(mappedBy = "author", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<TrackedLocation> trackedLocations = new ArrayList<>();

  @OneToMany(mappedBy = "recipient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<Notification> notifications = new ArrayList<>();

  @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
  private List<Passing> passings = new ArrayList<>();
}
