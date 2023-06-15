package com.joetsumap.domain.tmp.payload.response;

import com.joetsumap.domain.tmp.entity.Tmp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TmpResponse {
  
  private Tmp tmp;
}
