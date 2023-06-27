package com.joetsumap.domain.travelbooklet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;
import com.joetsumap.domain.travelbooklet.payload.request.CreateTravelBookletRequest;
import com.joetsumap.domain.travelbooklet.payload.request.UpdateTravelBookletRequest;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletDTO;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletListResponse;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletResponse;
import com.joetsumap.domain.travelbooklet.repository.TravelBookletRepository;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class TravelBookletService {

  @Autowired
  TravelBookletRepository travelbookletRepository;

  public TravelBookletListResponse findAll() {

    List<TravelBooklet> travelbooklet = travelbookletRepository.findAll();

    List<TravelBookletDTO> travelbookletDTOList = travelbooklet.stream().map(TravelBookletDTO::new).toList();

    return new TravelBookletListResponse(travelbookletDTOList);
  }

  public TravelBookletResponse findById(Long id) {

    TravelBooklet travelbooklet = travelbookletRepository.findById(id).get();

    return new TravelBookletResponse(new TravelBookletDTO(travelbooklet));
  }

  public TravelBookletResponse create(UserDetailsImpl userDetails, CreateTravelBookletRequest createRequest) {

    TravelBooklet travelbooklet = new TravelBooklet();

    travelbookletRepository.save(travelbooklet);

    return new TravelBookletResponse(new TravelBookletDTO(travelbooklet));
  }

  public TravelBookletResponse update(UserDetailsImpl userDetails, UpdateTravelBookletRequest updateRequest, Long id) {

    TravelBooklet travelbooklet = travelbookletRepository.findById(id).get();

    // Update Entity Logic Here ...

    return new TravelBookletResponse(new TravelBookletDTO(travelbooklet));
  }

  public TravelBookletResponse delete(UserDetailsImpl userDetails, Long id) {

    TravelBooklet travelbooklet = travelbookletRepository.findById(id).get();

    travelbookletRepository.delete(travelbooklet);

    return new TravelBookletResponse(new TravelBookletDTO(travelbooklet));
  }
}
