package com.joetsumap.db.migration.service.logic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.travelspot.entity.ETravelSpotType;
import com.joetsumap.domain.travelspot.entity.TravelSpotType;
import com.joetsumap.domain.travelspot.repository.TravelSpotTypeRepository;

@Service
public class TravelSpotTypeMigrateLogic {
  
  @Autowired
  private TravelSpotTypeRepository travelSpotTypeRepository;

  public void migrate() {
    
    // 観光地タイプのマイグレーション
    List<TravelSpotType> travelSpotTypes = new ArrayList<>();

    Arrays.asList(ETravelSpotType.values()).forEach(name -> {
      Optional<TravelSpotType> targetTravelSpotType = travelSpotTypeRepository.findByName(name);
      if (!targetTravelSpotType.isPresent()) {
        TravelSpotType travelSpotType = new TravelSpotType();
        travelSpotType.setName(name);
        travelSpotTypes.add(travelSpotType);
      }
    });

    if (travelSpotTypes.size() > 0) {
      travelSpotTypeRepository.saveAll(travelSpotTypes);

      System.out.println("観光地タイプのマイグレーションが完了しました。" + travelSpotTypes.size() + "件の観光地タイプを追加しました。");
    } else {
      System.out.println("観光地タイプのマイグレーションは不要です。");
    }
  }
}
