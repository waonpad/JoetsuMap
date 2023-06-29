package com.joetsumap.domain.travelspot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.common.payload.response.ToggleBookmarkResponse;
import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotDTO;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotListResponse;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotResponse;
import com.joetsumap.domain.travelspot.repository.TravelSpotRepository;
import com.joetsumap.domain.travelspot.repository.TravelSpotTypeRepository;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.domain.user.repository.UserRepository;
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
  public TravelSpotListResponse findAll() {

    List<TravelSpot> travelSpots = travelSpotRepository.findAll();

    List<TravelSpotDTO> travelSpotDTOList = travelSpots.stream().map(travelSpot -> {
      TravelSpotDTO travelSpotDTO = new TravelSpotDTO(travelSpot);
      travelSpotDTO.setAuthor(new UserDTO(travelSpot.getAuthor()));
      travelSpotDTO.setTypes(travelSpot.getTypes().stream().map(type -> type.getName()).toList());

      return travelSpotDTO;
    }).toList();

    return new TravelSpotListResponse(travelSpotDTOList);
  }

  public TravelSpotResponse findById(Long id) {

    TravelSpot travelSpot = travelSpotRepository.findById(id).get();

    return new TravelSpotResponse(new TravelSpotDTO(travelSpot));
  }

  /**
   * ブックマークしている観光地を全件取得する
   */
  public TravelSpotListResponse findAllBookmarks(UserDetailsImpl userDetails) {

    List<TravelSpot> travelSpots = userRepository.findById(userDetails.getUser().getId()).get().getBookmarkedTravelSpots();

    List<TravelSpotDTO> travelSpotDTOList = travelSpots.stream().map(travelSpot -> {
      TravelSpotDTO travelSpotDTO = new TravelSpotDTO(travelSpot);
      travelSpotDTO.setAuthor(new UserDTO(travelSpot.getAuthor()));
      travelSpotDTO.setTypes(travelSpot.getTypes().stream().map(type -> type.getName()).toList());

      return travelSpotDTO;
    }).toList();

    return new TravelSpotListResponse(travelSpotDTOList);
  }

  /**
   * ブックマーク状態の切り替え
   */
  public ToggleBookmarkResponse toggleBookmark(UserDetailsImpl userDetails, Long id) {

    TravelSpot travelSpot = travelSpotRepository.findById(id).get();

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
  public TravelSpotListResponse findAllByType(String type) {

    // TODO: 例外処理を追加する
    // ETravelSpotTypeに無いものを指定されるとエラーになる
    // https://www.sejuku.net/blog/14628
    ETravelSpotType travelSpotType = ETravelSpotType.valueOf(type);

    List<TravelSpot> travelSpots = travelSpotTypeRepository.findByName(travelSpotType).get().getTravelSpots();

    List<TravelSpotDTO> travelSpotDTOList = travelSpots.stream().map(travelSpot -> {
      TravelSpotDTO travelSpotDTO = new TravelSpotDTO(travelSpot);
      travelSpotDTO.setAuthor(new UserDTO(travelSpot.getAuthor()));
      travelSpotDTO.setTypes(travelSpot.getTypes().stream().map(type_ -> type_.getName()).toList());

      return travelSpotDTO;
    }).toList();

    return new TravelSpotListResponse(travelSpotDTOList);
  }
  
  /**
   * 観光地を検索する
   */
  public TravelSpotListResponse searchAll(String freeKeyword) {

    List<TravelSpot> travelSpots = travelSpotRepository.findByNameContaining(freeKeyword);

    List<TravelSpotDTO> travelSpotDTOList = travelSpots.stream().map(travelSpot -> {
      TravelSpotDTO travelSpotDTO = new TravelSpotDTO(travelSpot);
      travelSpotDTO.setAuthor(new UserDTO(travelSpot.getAuthor()));
      travelSpotDTO.setTypes(travelSpot.getTypes().stream().map(type_ -> type_.getName()).toList());

      return travelSpotDTO;
    }).toList();

    return new TravelSpotListResponse(travelSpotDTOList);
  }

  // 観光地を操作するメソッドは工数削減のため一旦作成しない
  // 管理者用サイトを作成する際に作成する

  // public TravelSpotResponse create(UserDetailsImpl userDetails, CreateTravelSpotRequest createRequest) {

  //   TravelSpot travelSpot = new TravelSpot();

  //   travelSpotRepository.save(travelSpot);

  //   return new TravelSpotResponse(new TravelSpotDTO(travelSpot));
  // }

  // public TravelSpotResponse update(UserDetailsImpl userDetails, UpdateTravelSpotRequest updateRequest, Long id) {

  //   TravelSpot travelSpot = travelSpotRepository.findById(id).get();

  //   // Update Entity Logic Here ...

  //   return new TravelSpotResponse(new TravelSpotDTO(travelSpot));
  // }

  // public void delete(UserDetailsImpl userDetails, Long id) {

  //   TravelSpot travelSpot = travelSpotRepository.findById(id).get();

  //   travelSpotRepository.delete(travelSpot);
  // }
}
