package com.joetsumap.domain.modelcourse.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.modelcourse.entity.ModelCourse;

public interface ModelCourseRepository extends JpaRepository<ModelCourse, Long> {
}
