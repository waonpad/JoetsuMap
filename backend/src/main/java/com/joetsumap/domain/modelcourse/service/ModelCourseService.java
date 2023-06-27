package com.joetsumap.domain.modelcourse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.modelcourse.entity.ModelCourse;
import com.joetsumap.domain.modelcourse.payload.request.CreateModelCourseRequest;
import com.joetsumap.domain.modelcourse.payload.request.UpdateModelCourseRequest;
import com.joetsumap.domain.modelcourse.payload.response.ModelCourseDTO;
import com.joetsumap.domain.modelcourse.payload.response.ModelCourseListResponse;
import com.joetsumap.domain.modelcourse.payload.response.ModelCourseResponse;
import com.joetsumap.domain.modelcourse.repository.ModelCourseRepository;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class ModelCourseService {

  @Autowired
  ModelCourseRepository modelcourseRepository;

  public ModelCourseListResponse findAll() {

    List<ModelCourse> modelcourse = modelcourseRepository.findAll();

    List<ModelCourseDTO> modelcourseDTOList = modelcourse.stream().map(ModelCourseDTO::new).toList();

    return new ModelCourseListResponse(modelcourseDTOList);
  }

  public ModelCourseResponse findById(Long id) {

    ModelCourse modelcourse = modelcourseRepository.findById(id).get();

    return new ModelCourseResponse(new ModelCourseDTO(modelcourse));
  }

  public ModelCourseResponse create(UserDetailsImpl userDetails, CreateModelCourseRequest createRequest) {

    ModelCourse modelcourse = new ModelCourse();

    modelcourseRepository.save(modelcourse);

    return new ModelCourseResponse(new ModelCourseDTO(modelcourse));
  }

  public ModelCourseResponse update(UserDetailsImpl userDetails, UpdateModelCourseRequest updateRequest, Long id) {

    ModelCourse modelcourse = modelcourseRepository.findById(id).get();

    // Update Entity Logic Here ...

    return new ModelCourseResponse(new ModelCourseDTO(modelcourse));
  }

  public void delete(UserDetailsImpl userDetails, Long id) {

    ModelCourse modelcourse = modelcourseRepository.findById(id).get();

    modelcourseRepository.delete(modelcourse);
  }
}
