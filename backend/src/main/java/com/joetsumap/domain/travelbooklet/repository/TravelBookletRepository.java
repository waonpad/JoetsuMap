package com.joetsumap.domain.travelbooklet.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;

public interface TravelBookletRepository extends JpaRepository<TravelBooklet, Long> {

  List<TravelBooklet> findByAuthorId(Long id);
  Page<TravelBooklet> findByAuthorId(Long id, Pageable pageable);
}
