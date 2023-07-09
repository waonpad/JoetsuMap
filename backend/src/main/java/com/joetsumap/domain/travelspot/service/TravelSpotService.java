package com.joetsumap.domain.travelspot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.joetsumap.common.payload.response.IdListResponse;
import com.joetsumap.common.payload.response.ToggleBookmarkResponse;
import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.travelspot.entity.TravelSpotType;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotDTO;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotPageResponse;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotResponse;
import com.joetsumap.domain.travelspot.repository.TravelSpotRepository;
import com.joetsumap.domain.travelspot.repository.TravelSpotTypeRepository;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.exception.exception.NotFoundException;
import com.joetsumap.security.services.UserDetailsImpl;
import com.joetsumap.domain.travelspot.entity.ETravelSpotType;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class TravelSpotService {

  @Autowired
  TravelSpotRepository travelSpotRepository;

  @Autowired
  TravelSpotTypeRepository travelSpotTypeRepository;

  @Autowired
  UserRepository userRepository;

  /**
   * 観光地を全件取得する
   */
  public TravelSpotPageResponse findAll(Pageable pageable) {

    Page<TravelSpot> travelSpotPage = travelSpotRepository.findAll(pageable);

    Page<TravelSpotDTO> travelSpotDTOPage = travelSpotPage.map(travelSpot -> {
      TravelSpotDTO travelSpotDTO = new TravelSpotDTO(travelSpot);
      travelSpotDTO.setAuthor(new UserDTO(travelSpot.getAuthor()));
      travelSpotDTO.setTypes(travelSpot.getTypes().stream().map(type -> type.getName()).toList());

      return travelSpotDTO;
    });

    return new TravelSpotPageResponse(travelSpotDTOPage);
  }

  public TravelSpotResponse findById(Long id) {

    TravelSpot travelSpot = travelSpotRepository.findById(id).orElseThrow(
      () -> new NotFoundException()
    );
      

    return new TravelSpotResponse(new TravelSpotDTO(travelSpot));
  }

  /**
   * ブックマークしている観光地を全件取得する
   */
  public TravelSpotPageResponse findAllBookmarks(UserDetailsImpl userDetails, Pageable pageable) {

    Page<TravelSpot> travelSpotPage = travelSpotRepository.findAllByBookmarkedUsers(userDetails.getUser(), pageable);

    Page<TravelSpotDTO> travelSpotDTOPage = travelSpotPage.map(travelSpot -> {
      TravelSpotDTO travelSpotDTO = new TravelSpotDTO(travelSpot);
      travelSpotDTO.setAuthor(new UserDTO(travelSpot.getAuthor()));
      travelSpotDTO.setTypes(travelSpot.getTypes().stream().map(type -> type.getName()).toList());

      return travelSpotDTO;
    });

    return new TravelSpotPageResponse(travelSpotDTOPage);
  }

  /**
   * ブックマークしている観光地のIDをページング無しで全件取得する
   */
  public IdListResponse findAllBookmarkIds(UserDetailsImpl userDetails) {

    List<TravelSpot> travelSpotPage = travelSpotRepository.findAllByBookmarkedUsers(userDetails.getUser());

    return new IdListResponse(travelSpotPage.stream().map(travelSpot -> {
      return travelSpot.getId();
    }).toList());
  }

  /**
   * ブックマーク状態の切り替え
   */
  public ToggleBookmarkResponse toggleBookmark(UserDetailsImpl userDetails, Long id) {

    TravelSpot travelSpot = travelSpotRepository.findById(id).orElseThrow(
      () -> new NotFoundException()
    );

    boolean isBookmarked = travelSpot.getBookmarkedUsers().stream().map(user -> {
      return user.getId();
    }).toList().contains(userDetails.getUser().getId());

    if (isBookmarked) {
      travelSpot.getBookmarkedUsers().removeIf(user -> {
        return user.getId() == userDetails.getUser().getId();
      });

      isBookmarked = false;
    } else {
      travelSpot.getBookmarkedUsers().add(userDetails.getUser());
    
      isBookmarked = true;
    }

    travelSpotRepository.save(travelSpot);

    return new ToggleBookmarkResponse(isBookmarked);
  }

  /**
   * 観光地のタイプで絞り込みを行う
   */
  public TravelSpotPageResponse findAllByType(String type, Pageable pageable) {

    // TODO: 例外処理を追加する → 普通に使っていればエラーにならないはずなので、行わない
    // ETravelSpotTypeに無いものを指定されるとエラーになる
    // https://www.sejuku.net/blog/14628
    ETravelSpotType travelSpotTypeValue = ETravelSpotType.valueOf(type);

    TravelSpotType travelSpotType = travelSpotTypeRepository.findByName(travelSpotTypeValue).orElseThrow(
      () -> new NotFoundException()
    );

    Page<TravelSpot> travelSpotPage = travelSpotRepository.findAllByTypes(travelSpotType, pageable);

    Page<TravelSpotDTO> travelSpotDTOPage = travelSpotPage.map(travelSpot -> {
      TravelSpotDTO travelSpotDTO = new TravelSpotDTO(travelSpot);
      travelSpotDTO.setAuthor(new UserDTO(travelSpot.getAuthor()));
      // typeが既に引数で使われているので、typeNameに変更
      travelSpotDTO.setTypes(travelSpot.getTypes().stream().map(typeName -> typeName.getName()).toList());

      return travelSpotDTO;
    });

    return new TravelSpotPageResponse(travelSpotDTOPage);
  }
  
  /**
   * 観光地を検索する
   */
  public TravelSpotPageResponse searchAll(String freeKeyword, Pageable pageable) {

    Page<TravelSpot> travelSpotPage = travelSpotRepository.findByNameContaining(freeKeyword, pageable);

    Page<TravelSpotDTO> travelSpotDTOPage = travelSpotPage.map(travelSpot -> {
      TravelSpotDTO travelSpotDTO = new TravelSpotDTO(travelSpot);
      travelSpotDTO.setAuthor(new UserDTO(travelSpot.getAuthor()));
      travelSpotDTO.setTypes(travelSpot.getTypes().stream().map(type -> type.getName()).toList());

      return travelSpotDTO;
    });

    return new TravelSpotPageResponse(travelSpotDTOPage);
  }

  // 観光地を操作するメソッドは工数削減のため一旦作成しない
  // 管理者用サイトを作成する際に作成する

  // create

  // update

  // delete
}
