package com.joetsumap.domain.tmp.controller;

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

import com.joetsumap.domain.tmp.payload.request.CreateTmpRequest;
import com.joetsumap.domain.tmp.payload.request.UpdateTmpRequest;
import com.joetsumap.domain.tmp.payload.response.TmpListResponse;
import com.joetsumap.domain.tmp.payload.response.TmpResponse;
import com.joetsumap.domain.tmp.service.TmpService;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.common.constant.ApiConst.*;
import static com.joetsumap.common.constant.ApiPathConst.*;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping("___________")
public class TmpController {

  @Autowired
  TmpService tmpService;

  @GetMapping("")
  public TmpListResponse findAll() {

    return tmpService.findAll();
  }

  @GetMapping("/{id}")
  public TmpResponse findById(@PathVariable Long id) {

    return tmpService.findById(id);
  }

  @PostMapping("/")
  public TmpResponse create(@AuthenticationPrincipal UserDetailsImpl userDetails, @Valid @RequestBody CreateTmpRequest createRequest) {

    return tmpService.create(userDetails, createRequest);
  }

  @PatchMapping("/{id}")
  public TmpResponse update(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id, @Valid @RequestBody UpdateTmpRequest updateRequest) {

    return tmpService.update(userDetails, updateRequest, id);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {

    tmpService.delete(userDetails, id);

    return ResponseEntity.noContent().build();
  }
}
