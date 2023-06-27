package com.joetsumap.db.migration.service.logic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.trackedlocation.entity.TrackedLocation;
import com.joetsumap.domain.trackedlocation.repository.TrackedLocationRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.repository.UserRepository;

@Service
public class TrackedLocationMigrateLogic {
  
  @Autowired
  TrackedLocationRepository trackedLocationRepository;

  @Autowired
  UserRepository userRepository;

  public void migrate() {

    Integer trackedLocationCount = 500;

    List<User> users = userRepository.findAll();

    Integer existTrackedLocationsCount = trackedLocationRepository.findAll().size();

    List<TrackedLocation> trackedLocations = new ArrayList<>();

    for (int i = existTrackedLocationsCount + 1; i <= trackedLocationCount; i++) {

      TrackedLocation trackedLocation = new TrackedLocation();
      
      double latitude = 37.14804525484053 + (Math.random() * 8 * (Math.random() > 0.5 ? 1 : -1));
      double longitude = 138.23628563899265 + (Math.random() * 8 * (Math.random() > 0.5 ? 1 : -1));

      trackedLocation.setLatitude(latitude);
      trackedLocation.setLongitude(longitude);

      int randomIndex = (int) (Math.random() * users.size());
      trackedLocation.setAuthor(users.get(randomIndex));

      trackedLocations.add(trackedLocation);
    }

    if (trackedLocations.size() > 0) {
      trackedLocationRepository.saveAll(trackedLocations);

      System.out.println("位置情報のマイグレーションが完了しました。" + trackedLocations.size() + "件のデータを登録しました。");
    } else {
      System.out.println("位置情報のマイグレーションは不要です。");
    }

  }
}
