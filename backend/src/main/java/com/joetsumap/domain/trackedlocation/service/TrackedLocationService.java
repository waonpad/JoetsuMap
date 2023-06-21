package com.joetsumap.domain.trackedlocation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.trackedlocation.entity.TrackedLocation;
import com.joetsumap.domain.trackedlocation.payload.request.CreateTrackedLocationRequest;
import com.joetsumap.domain.trackedlocation.payload.response.TrackedLocationListResponse;
import com.joetsumap.domain.trackedlocation.repository.TrackedLocationRepository;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class TrackedLocationService {

  @Autowired
  TrackedLocationRepository trackedlocationRepository;

  public TrackedLocationListResponse findMy(UserDetailsImpl userDetails) {

    // TODO: 本来はユーザーIDを元に取得
    List<TrackedLocation> trackedlocation = trackedlocationRepository.findAll();

    return new TrackedLocationListResponse(trackedlocation);
  }

  public void create(UserDetailsImpl userDetails, CreateTrackedLocationRequest createRequest) {

    TrackedLocation trackedlocation = new TrackedLocation(null, createRequest.getCoords().getLat(), createRequest.getCoords().getLng(), userDetails.getUser());

    trackedlocationRepository.save(trackedlocation);
  }
}
