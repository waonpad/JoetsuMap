package com.joetsumap.domain.modelcourse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.common.payload.response.ToggleBookmarkResponse;
import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot.entity.ModelCourseTravelSpot;
import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot.repository.ModelCourseTravelSpotRepository;
import com.joetsumap.domain.modelcourse.entity.ModelCourse;
import com.joetsumap.domain.modelcourse.payload.request.CreateModelCourseRequest;
import com.joetsumap.domain.modelcourse.payload.request.UpdateModelCourseRequest;
import com.joetsumap.domain.modelcourse.payload.response.ModelCourseDTO;
import com.joetsumap.domain.modelcourse.payload.response.ModelCourseListResponse;
import com.joetsumap.domain.modelcourse.payload.response.ModelCourseResponse;
import com.joetsumap.domain.modelcourse.repository.ModelCourseRepository;
import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotDTO;
import com.joetsumap.domain.travelspot.repository.TravelSpotRepository;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.error.util.ErrorUtil;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class ModelCourseService {

  @Autowired
  ModelCourseRepository modelCourseRepository;

  @Autowired
  TravelSpotRepository travelSpotRepository;

  @Autowired
  ModelCourseTravelSpotRepository modelCourseTravelSpotRepository;

  /**
   * モデルコースを全件取得する
   */
  public ModelCourseListResponse findAll() {

    List<ModelCourse> modelCourses = modelCourseRepository.findAll();

    List<ModelCourseDTO> modelCourseDTOList = modelCourses.stream().map(modelCourse -> {
      ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
      modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

      List<TravelSpotDTO> travelSpotDTOList = modelCourse.getModelCourseTravelSpots().stream()
          .map(modelCourseTravelSpot -> {
            return new TravelSpotDTO(modelCourseTravelSpot.getTravelSpot());
          }).toList();

      modelCourseDTO.setTravelSpots(travelSpotDTOList);

      return modelCourseDTO;
    }).toList();

    return new ModelCourseListResponse(modelCourseDTOList);
  }

  /**
   * モデルコースをIDで取得する
   */
  public ModelCourseResponse findById(Long id) {

    ModelCourse modelCourse = modelCourseRepository.findById(id).get();

    ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
    modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

    // TODO: 同じ処理を複数回書いていて冗長！後からリファクタリングする！
    List<TravelSpotDTO> travelSpotDTOList = modelCourse.getModelCourseTravelSpots().stream()
        .map(modelCourseTravelSpot -> {
          return new TravelSpotDTO(modelCourseTravelSpot.getTravelSpot());
        }).toList();

    modelCourseDTO.setTravelSpots(travelSpotDTOList);

    return new ModelCourseResponse(modelCourseDTO);
  }

  /**
   * モデルコースを作成する
   */
  public ModelCourseResponse create(UserDetailsImpl userDetails, CreateModelCourseRequest createRequest) {

    // TODO: 検索の結果、nullが返ってきた場合等、例外処理を追加する
    List<TravelSpot> travelSpots = createRequest.getTravelSpotIds().stream().map(travelSpotId -> {
      return travelSpotRepository.findById(travelSpotId).get();
    }).toList();

    // モデルコースを作成
    ModelCourse modelCourse = new ModelCourse();
    modelCourse.setTitle(createRequest.getTitle());
    
    // モデルコースとスポットの関連を作成
    List<ModelCourseTravelSpot> modelCourseTravelSpots = travelSpots.stream().map(travelSpot -> {
      ModelCourseTravelSpot modelCourseTravelSpot = new ModelCourseTravelSpot();
      modelCourseTravelSpot.setTravelSpot(travelSpot);
      modelCourseTravelSpot.setModelCourse(modelCourse);
      return modelCourseTravelSpot;
    }).toList();

    modelCourseRepository.saveAndFlush(modelCourse);
    modelCourseTravelSpotRepository.saveAllAndFlush(modelCourseTravelSpots);

    ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
    modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

    List<TravelSpotDTO> travelSpotDTOList = modelCourse.getModelCourseTravelSpots().stream()
        .map(modelCourseTravelSpot -> {
          return new TravelSpotDTO(modelCourseTravelSpot.getTravelSpot());
        }).toList();

    modelCourseDTO.setTravelSpots(travelSpotDTOList);

    return new ModelCourseResponse(modelCourseDTO);
  }

  /**
   * モデルコースを更新する
   */
  public ModelCourseResponse update(UserDetailsImpl userDetails, UpdateModelCourseRequest updateRequest, Long id) {

    ModelCourse modelCourse = modelCourseRepository.findById(id).get();

    ErrorUtil.checkAuthorWithException(userDetails, modelCourse.getAuthor().getId());

    // TODO: 検索の結果、nullが返ってきた場合等、例外処理を追加する
    List<TravelSpot> travelSpots = updateRequest.getTravelSpotIds().stream().map(travelSpotId -> {
      return travelSpotRepository.findById(travelSpotId).get();
    }).toList();

    modelCourse.setTitle(updateRequest.getTitle());

    // ModelCourseTravelSpotの削除
    modelCourseTravelSpotRepository.deleteAll(modelCourse.getModelCourseTravelSpots());
    
    // モデルコースとスポットの関連を作成
    List<ModelCourseTravelSpot> modelCourseTravelSpots = travelSpots.stream().map(travelSpot -> {
      ModelCourseTravelSpot modelCourseTravelSpot = new ModelCourseTravelSpot();
      modelCourseTravelSpot.setTravelSpot(travelSpot);
      modelCourseTravelSpot.setModelCourse(modelCourse);
      return modelCourseTravelSpot;
    }).toList();

    modelCourseRepository.saveAndFlush(modelCourse);
    modelCourseTravelSpotRepository.saveAllAndFlush(modelCourseTravelSpots);

    ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
    modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

    List<TravelSpotDTO> travelSpotDTOList = modelCourse.getModelCourseTravelSpots().stream()
        .map(modelCourseTravelSpot -> {
          return new TravelSpotDTO(modelCourseTravelSpot.getTravelSpot());
        }).toList();

    modelCourseDTO.setTravelSpots(travelSpotDTOList);

    return new ModelCourseResponse(modelCourseDTO);
  }

  /**
   * モデルコースを削除する
   */
  public void delete(UserDetailsImpl userDetails, Long id) {

    ModelCourse modelCourse = modelCourseRepository.findById(id).get();
    
    ErrorUtil.checkAuthorWithException(userDetails, modelCourse.getAuthor().getId());

    modelCourseRepository.delete(modelCourse);
  }

  /**
   * ブックマークしているモデルコースを全件取得する
   */
  public ModelCourseListResponse findAllBookmarks(UserDetailsImpl userDetails) {

    List<ModelCourse> modelCourses = userDetails.getUser().getBookmarkedModelCourses();

    List<ModelCourseDTO> modelCourseDTOList = modelCourses.stream().map(modelCourse -> {
      ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
      modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

      List<TravelSpotDTO> travelSpotDTOList = modelCourse.getModelCourseTravelSpots().stream()
          .map(modelCourseTravelSpot -> {
            return new TravelSpotDTO(modelCourseTravelSpot.getTravelSpot());
          }).toList();

      modelCourseDTO.setTravelSpots(travelSpotDTOList);

      return modelCourseDTO;
    }).toList();

    return new ModelCourseListResponse(modelCourseDTOList);
  }

  /**
   * ブックマーク状態の切り替え
   */
  public ToggleBookmarkResponse toggleBookmark(UserDetailsImpl userDetails, Long id) {

    ModelCourse modelCourse = modelCourseRepository.findById(id).get();

    boolean isBookmarked = false;

    if (modelCourse.getBookmarkedUsers().contains(userDetails.getUser())) {
      modelCourse.getBookmarkedUsers().remove(userDetails.getUser());

      isBookmarked = false;
    } else {
      modelCourse.getBookmarkedUsers().add(userDetails.getUser());

      isBookmarked = true;
    }

    modelCourseRepository.save(modelCourse);

    return new ToggleBookmarkResponse(isBookmarked);
  }
}
