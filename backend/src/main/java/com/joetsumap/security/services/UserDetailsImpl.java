package com.joetsumap.security.services;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.joetsumap.user.entity.User;

import lombok.Data;
import lombok.EqualsAndHashCode;

// import com.fasterxml.jackson.annotation.JsonIgnore;
// passwordについてた、関係あるかも？

@Data
@EqualsAndHashCode(callSuper=false)
public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private final User user;

  private Collection<? extends GrantedAuthority> authorities;

  public UserDetailsImpl(User user) {
    this.user = user;
    this.authorities = user.getRoles().stream()
    .map(role -> new SimpleGrantedAuthority(role.getName().name()))
    .collect(Collectors.toList());
  }

  // public static UserDetailsImpl build(User user) {
  //   List<GrantedAuthority> authorities = user.getRoles().stream()
  //       .map(role -> new SimpleGrantedAuthority(role.getName().name()))
  //       .collect(Collectors.toList());

  //   return new UserDetailsImpl(
  //       user.getId(), 
  //       user.getUsername(), 
  //       user.getEmail(),
  //       user.getPassword(), 
  //       authorities);
  // }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() { // --- ユーザに与えられている権限リストを返却するメソッド
    // return AuthorityUtils.createAuthorityList("ROLE_" + this.user.getRoleName());
    return this.authorities;
  }

  @Override
  public String getPassword() { // --- 登録されているパスワードを返却するメソッド
    return this.user.getPassword();
  }

  @Override
  public String getUsername() { // --- 登録されているユーザ名を返却するメソッド
    return this.user.getUsername();
  }


  @Override
  public boolean isAccountNonExpired() { // --- アカウントの有効期限の状態を判定するメソッド
    return true;
  }

  @Override
  public boolean isAccountNonLocked() { // --- アカウントのロック状態を判定するメソッド
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() { // --- 資格情報の有効期限の状態を判定するメソッド
    return true;
  }

  @Override
  public boolean isEnabled() { // --- 有効なユーザかを判定するメソッド
    return true;
  }

  // @Override
  // public boolean equals(Object o) {
  //   if (this == o)
  //     return true;
  //   if (o == null || getClass() != o.getClass())
  //     return false;
  //   UserDetailsImpl user = (UserDetailsImpl) o;
  //   return Objects.equals(user.getId(), getId());
  // }
}
