package com.joetsumap.db.migration.service.logic;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.travelspot.entity.TravelSpotType;
import com.joetsumap.domain.travelspot.repository.TravelSpotRepository;
import com.joetsumap.domain.travelspot.repository.TravelSpotTypeRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.common.file.constant.FileConst;
import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.role.repository.RoleRepository;
import com.joetsumap.domain.travelspot.constant.TravelSpotConst;

@Service
public class TravelSpotMigrateLogic {
  
  @Autowired
  private TravelSpotRepository travelSpotRepository;

  @Autowired
  private TravelSpotTypeRepository travelSpotTypeRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  public void migrate(User admin) {
    // NOTICE: 本来はこのメソッド内でadminを取得したかったが、トランザクションの関係？で引数で受け取ることにした。

    Integer travelSpotCount = 100;

    Integer existTravelSpotCount = travelSpotRepository.findAll().size();

    double latitudeBase = 37.14804525484053;
    double longitudeBase = 138.23628563899265;

    List<TravelSpotType> travelSpotTypes = travelSpotTypeRepository.findAll();
    List<User> users = userRepository.findAll();
    
    List<TravelSpot> travelSpots = new ArrayList<>();

    for (int i = existTravelSpotCount + 1; i <= travelSpotCount; i++) {
      String counter = String.format("%03d", i);

      TravelSpot travelSpot = new TravelSpot();
      travelSpot.setName("観光地" + counter);
      travelSpot.setAddress("住所" + counter);
      travelSpot.setTel("012-3456-789" + counter);

      travelSpot.setPhoto(TravelSpotConst.PHOTO_SAVE_DIR + "travel-spot-photo-sample" + FileConst.IMAGE_SAVE_FORMAT);

      // 緯度経度に誤差をランダムで加える
      double latitude = latitudeBase + (Math.random() * 0.0001 * (Math.random() > 0.5 ? 1 : -1));
      double longitude = longitudeBase + (Math.random() * 0.001 * (Math.random() > 0.5 ? 1 : -1));

      travelSpot.setLatitude(latitude);
      travelSpot.setLongitude(longitude);

      // 作成者を付与する
      travelSpot.setAuthor(admin);

      // ランダムでタイプを付与する
      List<TravelSpotType> travelSpotTypeList = new ArrayList<>();

      int travelSpotTypeCount = (int) (Math.random() * 2) + 1;
      for (int j = 0; j < travelSpotTypeCount; j++) {
        TravelSpotType travelSpotType = travelSpotTypes.get((int) (Math.random() * travelSpotTypes.size()));
        travelSpotTypeList.add(travelSpotType);
      }

      // タイプがない場合はランダムで1つ付与する
      // 冗長な処理？
      for (travelSpotTypeList.size(); travelSpotTypeList.size() < 1; ) {
        if (travelSpotTypeList.size() == 0) {
          TravelSpotType travelSpotType = travelSpotTypes.get((int) (Math.random() * travelSpotTypes.size()));
          travelSpotTypeList.add(travelSpotType);
        }
      }

      travelSpot.setTypes(travelSpotTypeList);

      // ランダムでブックマークさせる
      List<User> bookmarkUsers = new ArrayList<>();
      for (int j = 0; j < users.size(); j++) {
        if (Math.random() > 0.8) {
          bookmarkUsers.add(users.get(j));
        }
      }
      travelSpot.setBookmarkedUsers(bookmarkUsers);

      travelSpots.add(travelSpot);
    }

    if (travelSpots.size() > 0) {
      travelSpotRepository.saveAll(travelSpots);

      System.out.println("観光地のマイグレーションが完了しました。" + travelSpots.size() + "件のデータを登録しました。");
    } else {
      System.out.println("観光地のマイグレーションは不要です。");
    }
  }
}
