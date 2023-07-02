package com.joetsumap.domain.modelcourse.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.common.payload.response.ToggleBookmarkResponse;
import com.joetsumap.domain.modelcourse.payload.request.CreateModelCourseRequest;
import com.joetsumap.domain.modelcourse.payload.request.UpdateModelCourseRequest;
import com.joetsumap.domain.modelcourse.payload.response.ModelCoursePageResponse;
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
  ModelCourseService modelCourseService;

  @GetMapping("")
  public ModelCoursePageResponse findAll(@PageableDefault Pageable pageable) {

    return modelCourseService.findAll(pageable);
  }

  @GetMapping("/{id}")
  public ModelCourseResponse findById(@PathVariable Long id) {

    return modelCourseService.findById(id);
  }

  @PostMapping("")
  public ModelCourseResponse create(@AuthenticationPrincipal UserDetailsImpl userDetails, @Valid @RequestBody CreateModelCourseRequest createRequest) {

    return modelCourseService.create(userDetails, createRequest);
  }

  @PatchMapping("/{id}")
  public ModelCourseResponse update(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id, @Valid @RequestBody UpdateModelCourseRequest updateRequest) {

    return modelCourseService.update(userDetails, updateRequest, id);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {

    modelCourseService.delete(userDetails, id);

    return ResponseEntity.noContent().build();
  }
  
  @GetMapping("/bookmarks")
  public ModelCoursePageResponse findAllBookmarks(@AuthenticationPrincipal UserDetailsImpl userDetails, @PageableDefault Pageable pageable) {

    return modelCourseService.findAllBookmarks(userDetails, pageable);
  }

  @PostMapping("bookmarks/{id}")
  public ToggleBookmarkResponse toggleBookmark(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {

    return modelCourseService.toggleBookmark(userDetails, id);
  }

  @GetMapping("/search")
  public ModelCoursePageResponse searchAll(@RequestParam(value = "freeKeyword") String freeKeyword, @PageableDefault Pageable pageable) {

    return modelCourseService.searchAll(freeKeyword, pageable);
  }

  @GetMapping("/users/{userId}")
  public ModelCoursePageResponse findAllByAuthorId(@PathVariable Long userId, @PageableDefault Pageable pageable) {

    return modelCourseService.findAllByAuthorId(userId, pageable);
  }
}
