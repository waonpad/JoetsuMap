package com.joetsumap.domain.modelcourse.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.domain.modelcourse.payload.request.CreateModelCourseRequest;
import com.joetsumap.domain.modelcourse.payload.request.UpdateModelCourseRequest;
import com.joetsumap.domain.modelcourse.payload.response.ModelCourseListResponse;
import com.joetsumap.domain.modelcourse.payload.response.ModelCourseResponse;
import com.joetsumap.domain.modelcourse.service.ModelCourseService;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.common.constant.ApiConst.*;
import static com.joetsumap.common.constant.ApiPathConst.*;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_MODEL_COURSE_PREFIX)
public class ModelCourseController {

  @Autowired
  ModelCourseService modelcourseService;

  @GetMapping("/")
  public ModelCourseListResponse findAll() {

    return modelcourseService.findAll();
  }

  @GetMapping("/{id}")
  public ModelCourseResponse findById(@PathVariable Long id) {

    return modelcourseService.findById(id);
  }

  @PostMapping("/")
  public ModelCourseResponse create(@AuthenticationPrincipal UserDetailsImpl userDetails, @Valid @RequestBody CreateModelCourseRequest createRequest) {

    return modelcourseService.create(userDetails, createRequest);
  }

  @PatchMapping("/{id}")
  public ModelCourseResponse update(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id, @Valid @RequestBody UpdateModelCourseRequest updateRequest) {

    return modelcourseService.update(userDetails, updateRequest, id);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {

    modelcourseService.delete(userDetails, id);

    return ResponseEntity.noContent().build();
  }
}
