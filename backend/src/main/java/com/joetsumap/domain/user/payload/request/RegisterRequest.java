package com.joetsumap.domain.user.payload.request;

import java.util.List;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  private List<String> role;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  @NotBlank
  @Size(min = 6, max = 40)
  private String confirmPassword;

	@AssertTrue
	public boolean isPasswordValid() {
		if(password == null || confirmPassword == null) {
			return false;
		}
		return password.equals(confirmPassword);
	}

}
