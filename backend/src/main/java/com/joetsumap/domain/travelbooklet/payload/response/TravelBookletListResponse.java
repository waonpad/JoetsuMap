package com.joetsumap.domain.travelbooklet.payload.response;

import java.util.List;

import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelBookletListResponse {
  
  private List<TravelBooklet> travelbooklets;
}