package com.joetsumap.db.migration.service.logic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;
import com.joetsumap.domain.travelbooklet.repository.TravelBookletRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.common.file.constant.FileConst;
import com.joetsumap.domain.travelbooklet.constant.TravelBookletConst;

@Service
public class TravelBookletMigrateLogic {
  
  @Autowired
  TravelBookletRepository travelBookletRepository;

  @Autowired
  UserRepository userRepository;

  public void migrate() {

    Integer travelBookletCount = 300;

    Integer existTravelBookletCount = travelBookletRepository.findAll().size();

    List<User> users = userRepository.findAll();

    List<TravelBooklet> travelBooklets = new ArrayList<>();

    for (int i = existTravelBookletCount + 1; i <= travelBookletCount; i++) {
      String counter = String.format("%03d", i);

      String travelBookletTitle = "旅のしおり" + counter;

      if (travelBookletRepository.findAllByTitle(travelBookletTitle).isEmpty() == false) {
        continue;
      }

      TravelBooklet travelBooklet = new TravelBooklet();
      travelBooklet.setTitle(travelBookletTitle);
      travelBooklet.setText("本文" + counter);
      travelBooklet.setPhoto(TravelBookletConst.PHOTO_SAVE_DIR + "travel-booklet-photo-sample" + FileConst.IMAGE_SAVE_FORMAT);
      
      // ランダムにAuthorを設定
      int randomIndex = (int) (Math.random() * users.size());
      travelBooklet.setAuthor(users.get(randomIndex));

      travelBooklets.add(travelBooklet);
    }

    if (travelBooklets.size() > 0) {
      travelBookletRepository.saveAll(travelBooklets);

      System.out.println("旅のしおりのマイグレーションが完了しました。" + travelBooklets.size() + "件のデータを登録しました。");
    } else {
      System.out.println("旅のしおりのマイグレーションは不要です。");
    }
  }
}
