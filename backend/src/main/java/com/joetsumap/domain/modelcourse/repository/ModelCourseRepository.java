package com.joetsumap.domain.modelcourse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.modelcourse.entity.ModelCourse;

public interface ModelCourseRepository extends JpaRepository<ModelCourse, Long> {

  List<ModelCourse> findByTitleContaining(String freeKeyword);

  List<ModelCourse> findByAuthorId(Long id);
}
