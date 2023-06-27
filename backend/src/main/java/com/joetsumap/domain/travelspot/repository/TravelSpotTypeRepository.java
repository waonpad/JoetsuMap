package com.joetsumap.domain.travelspot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.travelspot.entity.ETravelSpotType;
import com.joetsumap.domain.travelspot.entity.TravelSpotType;

public interface TravelSpotTypeRepository extends JpaRepository<TravelSpotType, Long> {
  Optional<TravelSpotType> findByName(ETravelSpotType name);
}
