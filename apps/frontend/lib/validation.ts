export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface SigninFormData {
  email: string;
  password: string;
}

export const validateSignupForm = (data: SignupFormData): string | null => {
  const { username, email, password, confirmPassword, role } = data;

  if (
    !username.trim() ||
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim() ||
    !role.trim()
  ) {
    return "All fields are required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  if (role !== "TEACHER" && role !== "STUDENT") {
    return "Invalid role";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return null; // ✅ no error
};

export const validateSigninForm = (data: SigninFormData): string | null => {
  const { email, password } = data;

  if (!email.trim() || !password.trim()) return "All fields are required.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address.";

  if (password.length < 6)
    return "Password must be at least 6 characters long.";

  return null;
};
