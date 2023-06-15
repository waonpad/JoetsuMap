package com.joetsumap.domain.tmp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.tmp.entity.Tmp;
import com.joetsumap.domain.tmp.payload.request.CreateTmpRequest;
import com.joetsumap.domain.tmp.payload.request.UpdateTmpRequest;
import com.joetsumap.domain.tmp.payload.response.TmpListResponse;
import com.joetsumap.domain.tmp.payload.response.TmpResponse;
import com.joetsumap.domain.tmp.repository.TmpRepository;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class TmpService {

  @Autowired
  TmpRepository tmpRepository;

  public TmpListResponse findAll() {

    List<Tmp> tmp = tmpRepository.findAll();

    return new TmpListResponse(tmp);
  }

  public TmpResponse findById(Long id) {

    Tmp tmp = tmpRepository.findById(id).get();

    return new TmpResponse(tmp);
  }

  public TmpResponse create(UserDetailsImpl userDetails, CreateTmpRequest createRequest) {

    Tmp tmp = new Tmp();

    tmpRepository.save(tmp);

    return new TmpResponse(tmp);
  }

  public TmpResponse update(UserDetailsImpl userDetails, UpdateTmpRequest updateRequest, Long id) {

    Tmp tmp = tmpRepository.findById(id).get();

    // Update Entity Logic Here ...

    return new TmpResponse(tmp);
  }

  public void delete(UserDetailsImpl userDetails, Long id) {

    Tmp tmp = tmpRepository.findById(id).get();

    tmpRepository.delete(tmp);
  }
}