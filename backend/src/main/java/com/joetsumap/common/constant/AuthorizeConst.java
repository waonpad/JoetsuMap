package com.joetsumap.common.constant;

public final class AuthorizeConst {
  
  public static final String AUTHORIZED_USER = "hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')";

  public static final String AUTHORIZED_MODERATOR = "hasRole('MODERATOR')";

  public static final String AUTHORIZED_ADMIN = "hasRole('ADMIN')";

  public static final String AUTHORIZED_ADMIN_OR_MODERATOR = "hasRole('MODERATOR') or hasRole('ADMIN')";
}
