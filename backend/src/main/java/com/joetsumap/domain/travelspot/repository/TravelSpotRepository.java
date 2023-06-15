package com.joetsumap.domain.travelspot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.travelspot.entity.TravelSpot;

public interface TravelSpotRepository extends JpaRepository<TravelSpot, Long> {
}
