package com.joetsumap.domain.travelspot.entity;

import java.util.ArrayList;
import java.util.List;

import com.joetsumap.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@Table(name = "travel_spot_types")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
@ToString(exclude = "travelSpots")
public class TravelSpotType extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(length = 20, nullable = false)
  private ETravelSpotType name;

  @ManyToMany(fetch = FetchType.EAGER, mappedBy = "types")
  private List<TravelSpot> travelSpots = new ArrayList<>();

}