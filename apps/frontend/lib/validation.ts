export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateSignupForm = (data: SignupFormData): string | null => {
  const { username, email, password, confirmPassword } = data;

  if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
    return "All fields are required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return null; // ✅ no error
};