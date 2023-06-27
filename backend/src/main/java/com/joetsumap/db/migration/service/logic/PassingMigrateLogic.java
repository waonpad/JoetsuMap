package com.joetsumap.db.migration.service.logic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.passing.entity.Passing;
import com.joetsumap.domain.passing.repository.PassingRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.repository.UserRepository;

@Service
public class PassingMigrateLogic {
  
  @Autowired
  PassingRepository passingRepository;

  @Autowired
  UserRepository userRepository;

  public void migrate() {
    
    Integer passingCount = 300;

    List<User> users = userRepository.findAll();

    Integer existPassingCount = passingRepository.findAll().size();

    List<Passing> passings = new ArrayList<>();

    for (int i = existPassingCount + 1; i <= passingCount; i++) {

      Passing passing = new Passing();
      
      User user1 = users.get((int) (Math.random() * users.size()));

      // user1とは異なるuser2を取得する
      User user2 = null;
      while (user2 == null || user1.getId() == user2.getId()) {
        user2 = users.get((int) (Math.random() * users.size()));
      }

      passing.setUser1(user1);
      passing.setUser2(user2);

      passings.add(passing);
    }

    if (passings.size() > 0) {
      passingRepository.saveAll(passings);

      System.out.println("すれ違い情報のマイグレーションが完了しました。" + passings.size() + "件のデータを登録しました。");
    } else {
      System.out.println("すれ違い情報のマイグレーションは不要です。");
    }
  }
}
