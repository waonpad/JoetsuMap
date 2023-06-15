package com.joetsumap.domain.tmp.payload.response;

import java.util.List;

import com.joetsumap.domain.tmp.entity.Tmp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TmpListResponse {
  
  private List<Tmp> tmps;
}
