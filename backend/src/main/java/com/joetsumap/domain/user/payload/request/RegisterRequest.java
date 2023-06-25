package com.joetsumap.domain.user.payload.request;

import java.util.List;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

  @NotBlank
  @Size(max = 50)
  private String username;

  @NotBlank
  @Size(max = 254)
  @Email
  private String email;

  private List<String> roles;

  @NotBlank
  @Size(min = 8, max = 254)
  private String password;

  @NotBlank
  @Size(min = 8, max = 254)
  private String confirmPassword;

  @NotBlank
  private String icon;

	@AssertTrue
	public boolean isPasswordValid() {
		if(password == null || confirmPassword == null) {
			return false;
		}
		return password.equals(confirmPassword);
	}

}
