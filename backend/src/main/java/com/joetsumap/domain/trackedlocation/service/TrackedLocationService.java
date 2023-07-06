package com.joetsumap.domain.trackedlocation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.trackedlocation.entity.TrackedLocation;
import com.joetsumap.domain.trackedlocation.payload.request.CreateTrackedLocationRequest;
import com.joetsumap.domain.trackedlocation.payload.response.TrackedLocationDTO;
import com.joetsumap.domain.trackedlocation.payload.response.TrackedLocationListResponse;
import com.joetsumap.domain.trackedlocation.payload.response.TrackedLocationResponse;
import com.joetsumap.domain.trackedlocation.repository.TrackedLocationRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.exception.exception.NotFoundException;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class TrackedLocationService {

  @Autowired
  TrackedLocationRepository trackedLocationRepository;

  @Autowired
  UserRepository userRepository;
  
  /**
   * ログインユーザーに関連する位置情報を取得する
   */
  public TrackedLocationListResponse findMy(UserDetailsImpl userDetails) {

    User user = userRepository.findById(userDetails.getUser().getId()).orElseThrow(
      () -> new NotFoundException()
    );

    List<TrackedLocation> trackedLocations = user.getTrackedLocations();

    List<TrackedLocationDTO> trackedLocationDTOList = trackedLocations.stream().map(trackedLocation -> {
      TrackedLocationDTO trackedLocationDTO = new TrackedLocationDTO(trackedLocation);

      return trackedLocationDTO;
    }).toList();

    return new TrackedLocationListResponse(trackedLocationDTOList);
  }

  /**
   * 位置情報を登録する
   */
  public TrackedLocationResponse create(UserDetailsImpl userDetails, CreateTrackedLocationRequest createRequest) {

    TrackedLocation trackedLocation = new TrackedLocation();
    trackedLocation.setLatitude(createRequest.getCoords().getLat().doubleValue());
    trackedLocation.setLongitude(createRequest.getCoords().getLng().doubleValue());
    trackedLocation.setAuthor(userDetails.getUser());

    trackedLocationRepository.saveAndFlush(trackedLocation);

    return new TrackedLocationResponse(new TrackedLocationDTO(trackedLocation));
  }
}
