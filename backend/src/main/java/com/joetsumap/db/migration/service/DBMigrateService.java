package com.joetsumap.db.migration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.db.migration.service.logic.ModelCourseMigrateLogic;
import com.joetsumap.db.migration.service.logic.NotificationMigrateLogic;
import com.joetsumap.db.migration.service.logic.PassingMigrateLogic;
import com.joetsumap.db.migration.service.logic.RoleMigrateLogic;
import com.joetsumap.db.migration.service.logic.TrackedLocationMigrateLogic;
import com.joetsumap.db.migration.service.logic.TravelBookletMigrateLogic;
import com.joetsumap.db.migration.service.logic.TravelSpotMigrateLogic;
import com.joetsumap.db.migration.service.logic.TravelSpotTypeMigrateLogic;
import com.joetsumap.db.migration.service.logic.UserMigrateLogic;
import com.joetsumap.domain.user.entity.User;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class DBMigrateService {
  
  @Autowired
  private RoleMigrateLogic roleMigrateLogic;

  @Autowired
  private TravelSpotTypeMigrateLogic travelSpotTypeMigrateLogic;

  @Autowired
  private UserMigrateLogic userMigrateLogic;

  @Autowired
  private TravelSpotMigrateLogic travelSpotMigrateLogic;

  @Autowired
  private TravelBookletMigrateLogic travelBookletMigrateLogic;

  @Autowired
  private TrackedLocationMigrateLogic trackedLocationMigrateLogic;

  @Autowired
  private PassingMigrateLogic passingMigrateLogic;

  @Autowired
  private NotificationMigrateLogic notificationMigrateLogic;

  @Autowired
  private ModelCourseMigrateLogic modelCourseMigrateLogic;

  public void migrate() {

    // ロールのマイグレーション
    roleMigrateLogic.migrate();

    // 観光地タイプのマイグレーション
    travelSpotTypeMigrateLogic.migrate();

    // 管理者のマイグレーション
    User admin = userMigrateLogic.migrateAdmin();

    // ユーザーのマイグレーション
    userMigrateLogic.migrate();

    // 観光地のマイグレーション
    travelSpotMigrateLogic.migrate(admin);

    // 旅のしおりのマイグレーション
    travelBookletMigrateLogic.migrate();

    // 位置情報のマイグレーション
    trackedLocationMigrateLogic.migrate();

    // すれ違い情報のマイグレーション
    passingMigrateLogic.migrate();

    // 通知のマイグレーション
    notificationMigrateLogic.migrate();

    // モデルコースのマイグレーション
    modelCourseMigrateLogic.migrate();
  }
}
