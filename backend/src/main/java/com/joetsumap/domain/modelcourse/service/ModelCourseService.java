package com.joetsumap.domain.modelcourse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.joetsumap.common.payload.response.IdListResponse;
import com.joetsumap.common.payload.response.ToggleBookmarkResponse;
import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot.entity.ModelCourseTravelSpot;
import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot.repository.ModelCourseTravelSpotRepository;
import com.joetsumap.domain.modelcourse.entity.ModelCourse;
import com.joetsumap.domain.modelcourse.payload.request.CreateModelCourseRequest;
import com.joetsumap.domain.modelcourse.payload.request.UpdateModelCourseRequest;
import com.joetsumap.domain.modelcourse.payload.response.ModelCourseDTO;
import com.joetsumap.domain.modelcourse.payload.response.ModelCoursePageResponse;
import com.joetsumap.domain.modelcourse.payload.response.ModelCourseResponse;
import com.joetsumap.domain.modelcourse.repository.ModelCourseRepository;
import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotDTO;
import com.joetsumap.domain.travelspot.repository.TravelSpotRepository;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.exception.exception.NotFoundException;
import com.joetsumap.exception.exception.TravelSpotInModelCourseNotFoundException;
import com.joetsumap.exception.util.ExceptionUtil;
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

  @Autowired
  UserRepository userRepository;

  /**
   * モデルコースを全件取得する
   */
  public ModelCoursePageResponse findAll(Pageable pageable) {

    Page<ModelCourse> modelCourses = modelCourseRepository.findAll(pageable);

    Page<ModelCourseDTO> modelCourseDTOPage = modelCourses.map(modelCourse -> {
      ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
      modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

      List<TravelSpotDTO> travelSpotDTOList = modelCourse.getModelCourseTravelSpots().stream()
          .map(modelCourseTravelSpot -> {
            return new TravelSpotDTO(modelCourseTravelSpot.getTravelSpot());
          }).toList();

      modelCourseDTO.setTravelSpots(travelSpotDTOList);

      return modelCourseDTO;
    });

    return new ModelCoursePageResponse(modelCourseDTOPage);
  }

  /**
   * モデルコースをIDで取得する
   */
  public ModelCourseResponse findById(Long id) {

    ModelCourse modelCourse = modelCourseRepository.findById(id).orElseThrow(
      () -> new NotFoundException()
    );

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
   * モデルコースを作成する
   */
  public ModelCourseResponse create(UserDetailsImpl userDetails, CreateModelCourseRequest createRequest) {

    List<TravelSpot> travelSpots = createRequest.getTravelSpotIds().stream().map(travelSpotId -> {
      return travelSpotRepository.findById(travelSpotId).orElseThrow(
        () -> new TravelSpotInModelCourseNotFoundException()
      );
    }).toList();

    // モデルコースを作成
    ModelCourse modelCourse = new ModelCourse();
    modelCourse.setTitle(createRequest.getTitle());
    modelCourse.setAuthor(userDetails.getUser());
    
    // モデルコースとスポットの関連を作成
    List<ModelCourseTravelSpot> modelCourseTravelSpots = travelSpots.stream().map(travelSpot -> {
      ModelCourseTravelSpot modelCourseTravelSpot = new ModelCourseTravelSpot();
      modelCourseTravelSpot.setTravelSpot(travelSpot);
      modelCourseTravelSpot.setModelCourse(modelCourse);
      modelCourseTravelSpot.setSpotOrder(travelSpots.indexOf(travelSpot));
      return modelCourseTravelSpot;
    }).toList();

    modelCourseRepository.saveAndFlush(modelCourse);
    modelCourseTravelSpotRepository.saveAllAndFlush(modelCourseTravelSpots);

    ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
    modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

    List<TravelSpotDTO> travelSpotDTOList = modelCourseTravelSpots.stream()
        .map(modelCourseTravelSpot -> {
          TravelSpot travelSpot = modelCourseTravelSpot.getTravelSpot();

          TravelSpotDTO travelSpotDTO = new TravelSpotDTO(travelSpot);

          return travelSpotDTO;
        }).toList();

    modelCourseDTO.setTravelSpots(travelSpotDTOList);

    return new ModelCourseResponse(modelCourseDTO);
  }

  /**
   * モデルコースを更新する
   */
  public ModelCourseResponse update(UserDetailsImpl userDetails, UpdateModelCourseRequest updateRequest, Long id) {

    ModelCourse modelCourse = modelCourseRepository.findById(id).orElseThrow(
      () -> new NotFoundException()
    );

    ExceptionUtil.checkEqualsIdWithException(userDetails, modelCourse.getAuthor().getId());

    // TODO: エラーにするよりダミーに変えるなり配列から除外したほうがいい？うーん
    List<TravelSpot> travelSpots = updateRequest.getTravelSpotIds().stream().map(travelSpotId -> {
      return travelSpotRepository.findById(travelSpotId).orElseThrow(
        () -> new TravelSpotInModelCourseNotFoundException()
      );
    }).toList();

    modelCourse.setTitle(updateRequest.getTitle());

    // ModelCourseTravelSpotの削除
    List<ModelCourseTravelSpot> deleteTargetModelCourseTravelSpots = modelCourseTravelSpotRepository.findByModelCourseId(modelCourse.getId());
    modelCourseTravelSpotRepository.deleteAll(deleteTargetModelCourseTravelSpots);
    
    // モデルコースとスポットの関連を作成
    List<ModelCourseTravelSpot> modelCourseTravelSpots = travelSpots.stream().map(travelSpot -> {
      ModelCourseTravelSpot modelCourseTravelSpot = new ModelCourseTravelSpot();
      modelCourseTravelSpot.setTravelSpot(travelSpot);
      modelCourseTravelSpot.setModelCourse(modelCourse);
      modelCourseTravelSpot.setSpotOrder(travelSpots.indexOf(travelSpot));
      return modelCourseTravelSpot;
    }).toList();

    modelCourseRepository.saveAndFlush(modelCourse);
    modelCourseTravelSpotRepository.saveAllAndFlush(modelCourseTravelSpots);

    ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
    modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

    List<TravelSpotDTO> travelSpotDTOList = modelCourseTravelSpots.stream()
        .map(modelCourseTravelSpot -> {
          TravelSpot travelSpot = modelCourseTravelSpot.getTravelSpot();

          TravelSpotDTO travelSpotDTO = new TravelSpotDTO(travelSpot);

          return travelSpotDTO;
        }).toList();

    modelCourseDTO.setTravelSpots(travelSpotDTOList);

    return new ModelCourseResponse(modelCourseDTO);
  }

  /**
   * モデルコースを削除する
   */
  public void delete(UserDetailsImpl userDetails, Long id) {

    ModelCourse modelCourse = modelCourseRepository.findById(id).orElseThrow(
      () -> new NotFoundException()
    );
    
    ExceptionUtil.checkEqualsIdWithException(userDetails, modelCourse.getAuthor().getId());

    modelCourseRepository.delete(modelCourse);
  }

  /**
   * ブックマークしているモデルコースを全件取得する
   */
  public ModelCoursePageResponse findAllBookmarks(UserDetailsImpl userDetails, Pageable pageable) {

    Page<ModelCourse> modelCourses = modelCourseRepository.findByBookmarkedUsers(userDetails.getUser(), pageable);

    Page<ModelCourseDTO> modelCourseDTOPage = modelCourses.map(modelCourse -> {
      ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
      modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

      List<TravelSpotDTO> travelSpotDTOList = modelCourse.getModelCourseTravelSpots().stream()
          .map(modelCourseTravelSpot -> {
            return new TravelSpotDTO(modelCourseTravelSpot.getTravelSpot());
          }).toList();

      modelCourseDTO.setTravelSpots(travelSpotDTOList);

      return modelCourseDTO;
    });

    return new ModelCoursePageResponse(modelCourseDTOPage);
  }

  /**
   *  ブックマークしているモデルコースのIDをページングなしで全件取得する
   */
  public IdListResponse findAllBookmarkIds(UserDetailsImpl userDetails) {

    List<ModelCourse> modelCourses = modelCourseRepository.findByBookmarkedUsers(userDetails.getUser());

    return new IdListResponse(modelCourses.stream().map(modelCourse -> {
      return modelCourse.getId();
    }).toList());
  }

  /**
   * ブックマーク状態の切り替え
   */
  public ToggleBookmarkResponse toggleBookmark(UserDetailsImpl userDetails, Long id) {

    ModelCourse modelCourse = modelCourseRepository.findById(id).orElseThrow(
      () -> new NotFoundException()
    );

    boolean isBookmarked = modelCourse.getBookmarkedUsers().stream().map(user -> {
      return user.getId();
    }).toList().contains(userDetails.getUser().getId());

    if (isBookmarked) {
      modelCourse.getBookmarkedUsers().removeIf(user -> {
        return user.getId() == userDetails.getUser().getId();
      });

      isBookmarked = false;
    } else {
      modelCourse.getBookmarkedUsers().add(userDetails.getUser());
    
      isBookmarked = true;
    }

    modelCourseRepository.saveAndFlush(modelCourse);

    return new ToggleBookmarkResponse(isBookmarked);
  }

  /**
   * モデルコースを検索する
   */
  public ModelCoursePageResponse searchAll(String freeKeyword, Pageable pageable) {

    Page<ModelCourse> modelCourses = modelCourseRepository.findByTitleContaining(freeKeyword, pageable);

    Page<ModelCourseDTO> modelCourseDTOPage = modelCourses.map(modelCourse -> {
      ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
      modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

      List<TravelSpotDTO> travelSpotDTOList = modelCourse.getModelCourseTravelSpots().stream()
          .map(modelCourseTravelSpot -> {
            return new TravelSpotDTO(modelCourseTravelSpot.getTravelSpot());
          }).toList();

      modelCourseDTO.setTravelSpots(travelSpotDTOList);

      return modelCourseDTO;
    });

    return new ModelCoursePageResponse(modelCourseDTOPage);
  }

  /**
   * ユーザーの作成したモデルコースを取得する
   */
  public ModelCoursePageResponse findAllByAuthorId(Long authorId, Pageable pageable) {

    Page<ModelCourse> modelCourses = modelCourseRepository.findByAuthorId(authorId, pageable);

    Page<ModelCourseDTO> modelCourseDTOPage = modelCourses.map(modelCourse -> {
      ModelCourseDTO modelCourseDTO = new ModelCourseDTO(modelCourse);
      modelCourseDTO.setAuthor(new UserDTO(modelCourse.getAuthor()));

      List<TravelSpotDTO> travelSpotDTOList = modelCourse.getModelCourseTravelSpots().stream()
          .map(modelCourseTravelSpot -> {
            return new TravelSpotDTO(modelCourseTravelSpot.getTravelSpot());
          }).toList();

      modelCourseDTO.setTravelSpots(travelSpotDTOList);

      return modelCourseDTO;
    });

    return new ModelCoursePageResponse(modelCourseDTOPage);
  }
}