package com.joetsumap.domain.passing.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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

  /**
   * ログインユーザーに関連するすれ違い情報を取得する
   */
  public PassingListResponse findMy(UserDetailsImpl userDetails, Pageable pageable) {

    // ログインユーザーに関連するすれ違い情報を取得し、最新のすれ違い情報から順に表示する
    // TODO: 動作検証
    // TODO: ページング実装後回し JPQL使う？

    List<Passing> passings1 = passingRepository.findByUser1Id(userDetails.getUser().getId());
    List<Passing> passings2 = passingRepository.findByUser2Id(userDetails.getUser().getId());

    // すれ違い情報を結合する
    passings1.addAll(passings2);

    List<PassingDTO> passingDTOList = passings1.stream().map(p -> new PassingDTO(p, userDetails.getUser().getId()))
        .toList().stream().sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt())).toList();

    return new PassingListResponse(passingDTOList);
  }
}
