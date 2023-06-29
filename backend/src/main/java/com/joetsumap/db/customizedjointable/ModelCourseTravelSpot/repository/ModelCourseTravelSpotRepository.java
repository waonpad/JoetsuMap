package com.joetsumap.db.customizedjointable.ModelCourseTravelSpot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot.entity.ModelCourseTravelSpot;

public interface ModelCourseTravelSpotRepository extends JpaRepository<ModelCourseTravelSpot, Long> {

  List<ModelCourseTravelSpot> findByModelCourseId(Long id);
}
