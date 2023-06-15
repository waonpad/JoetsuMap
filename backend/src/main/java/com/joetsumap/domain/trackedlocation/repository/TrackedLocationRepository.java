package com.joetsumap.domain.trackedlocation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.trackedlocation.entity.TrackedLocation;

public interface TrackedLocationRepository extends JpaRepository<TrackedLocation, Long> {
}
