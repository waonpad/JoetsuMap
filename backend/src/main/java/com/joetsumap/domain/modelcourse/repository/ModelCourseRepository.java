package com.joetsumap.domain.modelcourse.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.modelcourse.entity.ModelCourse;
import com.joetsumap.domain.user.entity.User;

public interface ModelCourseRepository extends JpaRepository<ModelCourse, Long> {

  List<ModelCourse> findByTitleContaining(String freeKeyword);
  Page<ModelCourse> findByTitleContaining(String freeKeyword, Pageable pageable);

  List<ModelCourse> findByAuthorId(Long id);
  Page<ModelCourse> findByAuthorId(Long id, Pageable pageable);

  List<ModelCourse> findAllByBookmarkedUsers(User user);
  Page<ModelCourse> findAllByBookmarkedUsers(User user, Pageable pageable);
}
