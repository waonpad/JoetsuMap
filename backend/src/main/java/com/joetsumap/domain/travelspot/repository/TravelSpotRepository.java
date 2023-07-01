package com.joetsumap.domain.travelspot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.travelspot.entity.TravelSpotType;
import com.joetsumap.domain.user.entity.User;

public interface TravelSpotRepository extends JpaRepository<TravelSpot, Long> {

  Optional<TravelSpot> findByName(String travelSpotName);

  List<TravelSpot> findByNameContaining(String freeKeyword);
  Page<TravelSpot> findByNameContaining(String freeKeyword, Pageable pageable);

  List<TravelSpot> findAllByBookmarkedUsers(User user);
  Page<TravelSpot> findAllByBookmarkedUsers(User user, Pageable pageable);

  List<TravelSpot> findAllByTypes(TravelSpotType travelSpotType);
  Page<TravelSpot> findAllByTypes(TravelSpotType travelSpotType, Pageable pageable);
}
