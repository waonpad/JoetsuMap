package com.joetsumap.domain.passing.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.passing.entity.Passing;
import com.joetsumap.domain.passing.payload.response.PassingDTO;
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

    // ログインユーザーに関連するすれ違い情報を取得し、最新のすれ違い情報から順に表示する

    List<Passing> passing1 = passingRepository.findByUser1Id(userDetails.getUser().getId());
    List<Passing> passing2 = passingRepository.findByUser2Id(userDetails.getUser().getId());

    passing1.addAll(passing2);

    List<PassingDTO> passingDTO = passing1.stream().map(p -> new PassingDTO(p, userDetails.getUser().getId()))
        .toList().stream().sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt())).toList();

    return new PassingListResponse(passingDTO);
  }
}
