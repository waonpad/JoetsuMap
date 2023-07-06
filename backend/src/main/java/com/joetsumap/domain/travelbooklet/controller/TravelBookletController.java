package com.joetsumap.domain.travelbooklet.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
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
import com.joetsumap.domain.travelbooklet.payload.request.CreateTravelBookletRequest;
import com.joetsumap.domain.travelbooklet.payload.request.UpdateTravelBookletRequest;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletPageResponse;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletResponse;
import com.joetsumap.domain.travelbooklet.service.TravelBookletService;
import com.joetsumap.exception.exception.ExpectedException;
import com.joetsumap.exception.payload.response.EExpectedExceptionType;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.constant.ApiConst.*;
import static com.joetsumap.constant.ApiPathConst.*;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_TRAVEL_BOOKLET_PREFIX)
public class TravelBookletController {

  @Autowired
  TravelBookletService travelBookletService;

  @GetMapping("")
  public TravelBookletPageResponse findAll(@PageableDefault Pageable pageable) {

    return travelBookletService.findAll(pageable);
  }

  @GetMapping("/{id}")
  public TravelBookletResponse findById(@PathVariable Long id) {

    return travelBookletService.findById(id);
  }

  @PostMapping("")
  public TravelBookletResponse create(@AuthenticationPrincipal UserDetailsImpl userDetails, @Valid @RequestBody CreateTravelBookletRequest createRequest) {

    throw new ExpectedException(HttpStatus.CONFLICT, "てすと", EExpectedExceptionType.TEST);

    // return travelBookletService.create(userDetails, createRequest);
  }

  @PatchMapping("/{id}")
  public TravelBookletResponse update(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id, @Valid @RequestBody UpdateTravelBookletRequest updateRequest) {

    return travelBookletService.update(userDetails, updateRequest, id);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {

    travelBookletService.delete(userDetails, id);

    return ResponseEntity.ok().build();
  }

  @GetMapping("/users/{id}")
  public TravelBookletPageResponse findByAuthorId(@PathVariable Long id, @PageableDefault Pageable pageable) {

    return travelBookletService.findByAuthorId(id, pageable);
  }
}
