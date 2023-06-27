package com.joetsumap.db.migration.service.logic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot.entity.ModelCourseTravelSpot;
import com.joetsumap.db.customizedjointable.ModelCourseTravelSpot.repository.ModelCourseTravelSpotRepository;
import com.joetsumap.domain.modelcourse.entity.ModelCourse;
import com.joetsumap.domain.modelcourse.repository.ModelCourseRepository;
import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.travelspot.repository.TravelSpotRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.repository.UserRepository;

@Service
public class ModelCourseMigrateLogic {
  
  @Autowired
  ModelCourseRepository modelCourseRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  TravelSpotRepository travelSpotRepository;

  @Autowired
  ModelCourseTravelSpotRepository modelCourseTravelSpotRepository;

  public void migrate() {
      
      Integer modelCourseCount = 300;

      List<TravelSpot> travelSpots = travelSpotRepository.findAll();
      List<User> users = userRepository.findAll();
  
      Integer existModelCourseCount = modelCourseRepository.findAll().size();

      List<ModelCourse> modelCourses = new ArrayList<>();

      List<ModelCourseTravelSpot> modelCourseTravelSpots = new ArrayList<>();

      for (int i = existModelCourseCount + 1; i <= modelCourseCount; i++) {

        ModelCourse modelCourse = new ModelCourse();

        modelCourse.setTitle("モデルコース" + i);
        
        // ランダムで作成者を設定する
        int randomIndex = (int) (Math.random() * users.size());
        modelCourse.setAuthor(users.get(randomIndex));

        // ランダムで観光地リストを設定する
        List<TravelSpot> travelSpotList = new ArrayList<>();

        // 2から10のどれか
        Integer travelSpotCount = (int) (Math.random() * 9) + 2;

        // travelSpots.size() の範囲から、travelSpotCount個のtravelSpotをランダムに取得する(重複無し)
        List<Integer> randomIndexList = new ArrayList<>();
        for (int j = 0; j < travelSpotCount; j++) {
          Integer randomIndex2 = (int) (Math.random() * travelSpots.size());
          while (randomIndexList.contains(randomIndex2)) {
            randomIndex2 = (int) (Math.random() * travelSpots.size());
          }
          randomIndexList.add(randomIndex2);
        }

        for (int j = 0; j < randomIndexList.size(); j++) {
          travelSpotList.add(travelSpots.get(randomIndexList.get(j)));
        }

        for (int j = 0; j < travelSpotList.size(); j++) {
          ModelCourseTravelSpot modelCourseTravelSpot = new ModelCourseTravelSpot();
          modelCourseTravelSpot.setTravelSpot(travelSpotList.get(j));
          modelCourseTravelSpot.setModelCourse(modelCourse);
          modelCourseTravelSpot.setSpotOrder(j);

          modelCourseTravelSpots.add(modelCourseTravelSpot);
        }

        // // ランダムでブックマークさせる
        List<User> bookmarkUsers = new ArrayList<>();
        for (int j = 0; j < users.size(); j++) {
          if (Math.random() > 0.9) {
            bookmarkUsers.add(users.get(j));
          }
        }
        modelCourse.setBookmarkedUsers(bookmarkUsers);

        modelCourses.add(modelCourse);
      }
  
      if (modelCourses.size() > 0) {
        modelCourseRepository.saveAll(modelCourses);

        modelCourseTravelSpotRepository.saveAll(modelCourseTravelSpots);

        System.out.println("モデルコース情報のマイグレーションが完了しました。" + (modelCourseCount - existModelCourseCount) + "件のデータを登録しました。");
      } else {
        System.out.println("モデルコース情報のマイグレーションは不要です。");
      }
  }
}
