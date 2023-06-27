package com.joetsumap.domain.travelbooklet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;

public interface TravelBookletRepository extends JpaRepository<TravelBooklet, Long> {

  List<TravelBooklet> findByAuthorId(Long id);

  @Query("SELECT tb FROM TravelBooklet tb WHERE tb.title LIKE %:title%")
  List<TravelBooklet> findAllByTitle(@Param("title") String title);
}
