package com.joetsumap.domain.passing.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.passing.entity.Passing;

public interface PassingRepository extends JpaRepository<Passing, Long> {
}
