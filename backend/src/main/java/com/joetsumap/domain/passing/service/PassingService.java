package com.joetsumap.domain.passing.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.passing.entity.Passing;
import com.joetsumap.domain.passing.payload.response.PassingListResponse;
import com.joetsumap.domain.passing.repository.PassingRepository;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class PassingService {

  @Autowired
  PassingRepository passingRepository;

  public PassingListResponse findMy(UserDetailsImpl userDetails) {

    // TODO: 本来はユーザーIDを元に取得
    List<Passing> passing = passingRepository.findAll();

    return new PassingListResponse(passing);
  }
}
