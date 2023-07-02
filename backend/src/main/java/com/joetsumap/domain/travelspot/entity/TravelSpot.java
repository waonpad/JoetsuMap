package com.joetsumap.domain.travelspot.entity;

import java.util.ArrayList;
import java.util.List;
import com.joetsumap.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import com.joetsumap.domain.user.entity.User;

@Entity
@Data
@Table(name = "travel_spots", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "address"),
      @UniqueConstraint(columnNames = "tel")
    })
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
@ToString(exclude = {"modelCourseTravelSpots", "author", "bookmarkedUsers", "types"})
public class TravelSpot extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @NotBlank
  private String name;

  @Column(nullable = false)
  @NotBlank
  private String address;

  @Column(nullable = false)
  @NotBlank
  @Size(max = 21)
  private String tel;

  // リレーションでの定義に変更
  // @Column(nullable = false)
  // @NotBlank
  // private ETravelSpotType type;

  @Column(nullable = false)
  @NotBlank
  private String photo;

  @Column(nullable = false)
  @NotNull
  private double latitude;

  @Column(nullable = false)
  @NotNull
  private double longitude;

  // @OneToMany(mappedBy = "travelSpot", fetch = FetchType.LAZY)
  // private Set<ModelCourseTravelSpot> modelCourseTravelSpots = new HashSet<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id")
  private User author;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(	name = "bookmarked_travel_spots",
              joinColumns = @JoinColumn(name = "travel_spot_id"),
              inverseJoinColumns = @JoinColumn(name = "user_id"))
  private List<User> bookmarkedUsers = new ArrayList<>();

  // TODO: 同じタイプと複数回リレーションを結ばせないようにする
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(	name = "granted_travel_spot_types",
              joinColumns = @JoinColumn(name = "travel_spot_id"),
              inverseJoinColumns = @JoinColumn(name = "travel_spot_type_id"))
  private List<TravelSpotType> types = new ArrayList<>();
}
