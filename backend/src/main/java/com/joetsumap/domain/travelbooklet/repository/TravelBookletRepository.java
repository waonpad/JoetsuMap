package com.joetsumap.domain.travelbooklet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;

public interface TravelBookletRepository extends JpaRepository<TravelBooklet, Long> {
}
