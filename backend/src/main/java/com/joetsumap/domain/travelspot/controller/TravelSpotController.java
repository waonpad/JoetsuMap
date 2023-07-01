package com.joetsumap.domain.travelspot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.common.payload.response.ToggleBookmarkResponse;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotPageResponse;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotResponse;
import com.joetsumap.domain.travelspot.service.TravelSpotService;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.common.constant.ApiConst.*;
import static com.joetsumap.common.constant.ApiPathConst.*;
// import static com.joetsumap.common.constant.AuthorizeConst.*;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_TRAVEL_SPOT_PREFIX)
public class TravelSpotController {

  @Autowired
  TravelSpotService travelSpotService;

  @GetMapping("")
  public TravelSpotPageResponse findAll8(@PageableDefault Pageable pageable) {

    return travelSpotService.findAll(pageable);
  }

  @GetMapping("/{id}")
  public TravelSpotResponse findById(@PathVariable Long id) {

    return travelSpotService.findById(id);
  }

  @GetMapping("/bookmarks")
  public TravelSpotPageResponse findAllBookmarks(@AuthenticationPrincipal UserDetailsImpl userDetails, @PageableDefault Pageable pageable) {

    return travelSpotService.findAllBookmarks(userDetails, pageable);
  }

  @PostMapping("bookmarks/{id}")
  public ToggleBookmarkResponse toggleBookmark(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {

    return travelSpotService.toggleBookmark(userDetails, id);
  }

  @GetMapping("/types/{travelSpotTypeName}")
  public TravelSpotPageResponse findAllByType(@PathVariable("travelSpotTypeName") String travelSpotType, @PageableDefault Pageable pageable) {

    return travelSpotService.findAllByType(travelSpotType, pageable);
  }
  
  @GetMapping("/search")
  public TravelSpotPageResponse searchAll(@RequestParam(value = "freeKeyword") String freeKeyword, @PageableDefault Pageable pageable) {

    return travelSpotService.searchAll(freeKeyword, pageable);
  }

  // 観光地を操作するメソッドは工数削減のため一旦作成しない
  // 管理者用サイトを作成する際に作成する

  // @PostMapping("")
  // @PreAuthorize(AUTHORIZED_ADMIN_OR_MODERATOR)
  // public TravelSpotResponse create(@AuthenticationPrincipal UserDetailsImpl userDetails, @Valid @RequestBody CreateTravelSpotRequest createRequest) {

  //   return travelSpotService.create(userDetails, createRequest);
  // }

  // @PatchMapping("/{id}")
  // @PreAuthorize(AUTHORIZED_ADMIN_OR_MODERATOR)
  // public TravelSpotResponse update(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id, @Valid @RequestBody UpdateTravelSpotRequest updateRequest) {

  //   return travelSpotService.update(userDetails, updateRequest, id);
  // }

  // @DeleteMapping("/{id}")
  // @PreAuthorize(AUTHORIZED_ADMIN_OR_MODERATOR)
  // public ResponseEntity<Void> delete(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {

  //   travelSpotService.delete(userDetails, id);

  //   return ResponseEntity.noContent().build();
  // }
}
