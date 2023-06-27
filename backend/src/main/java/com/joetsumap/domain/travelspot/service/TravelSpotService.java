package com.joetsumap.domain.travelspot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.travelspot.payload.request.CreateTravelSpotRequest;
import com.joetsumap.domain.travelspot.payload.request.UpdateTravelSpotRequest;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotDTO;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotListResponse;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotResponse;
import com.joetsumap.domain.travelspot.repository.TravelSpotRepository;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class TravelSpotService {

  @Autowired
  TravelSpotRepository travelspotRepository;

  public TravelSpotListResponse findAll() {

    List<TravelSpot> travelspot = travelspotRepository.findAll();

    List<TravelSpotDTO> travelspotDTOList = travelspot.stream().map(TravelSpotDTO::new).toList();

    return new TravelSpotListResponse(travelspotDTOList);
  }

  public TravelSpotResponse findById(Long id) {

    TravelSpot travelspot = travelspotRepository.findById(id).get();

    return new TravelSpotResponse(new TravelSpotDTO(travelspot));
  }

  public TravelSpotResponse create(UserDetailsImpl userDetails, CreateTravelSpotRequest createRequest) {

    TravelSpot travelspot = new TravelSpot();

    travelspotRepository.save(travelspot);

    return new TravelSpotResponse(new TravelSpotDTO(travelspot));
  }

  public TravelSpotResponse update(UserDetailsImpl userDetails, UpdateTravelSpotRequest updateRequest, Long id) {

    TravelSpot travelspot = travelspotRepository.findById(id).get();

    // Update Entity Logic Here ...

    return new TravelSpotResponse(new TravelSpotDTO(travelspot));
  }

  public void delete(UserDetailsImpl userDetails, Long id) {

    TravelSpot travelspot = travelspotRepository.findById(id).get();

    travelspotRepository.delete(travelspot);
  }
}
