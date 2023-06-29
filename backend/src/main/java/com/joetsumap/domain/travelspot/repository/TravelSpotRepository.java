package com.joetsumap.domain.travelspot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.travelspot.entity.TravelSpot;

public interface TravelSpotRepository extends JpaRepository<TravelSpot, Long> {

  Optional<TravelSpot> findByName(String travelSpotName);

  List<TravelSpot> findByNameContaining(String freeKeyword);
}
