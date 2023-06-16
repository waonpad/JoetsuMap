package com.joetsumap.domain.passing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.passing.entity.Passing;

public interface PassingRepository extends JpaRepository<Passing, Long> {

  List<Passing> findByUser1Id(Long id);

  List<Passing> findByUser2Id(Long id);
}
