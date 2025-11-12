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

export interface CreateCourseData {
  name: string;
  description: string;
  price: number;
  date: Date;
}

export interface CreateLectureData {
  title: string;
  time: string;
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

export const validateCreateCourseForm = (
  data: CreateCourseData
): string | null => {
  // 1️⃣ Basic field presence
  if (!data.name || data.name.trim().length === 0)
    return "Course name is required.";

  if (!data.description || data.description.trim().length === 0)
    return "Course description is required.";

  if (!data.date) return "Course start date is required.";

  if (data.price === undefined || data.price === null)
    return "Course price is required.";

  // 2️⃣ Length constraints
  if (data.name.trim().length < 3)
    return "Course name must be at least 3 characters long.";

  if (data.description.trim().length < 10)
    return "Course description must be at least 10 characters long.";

  // 3️⃣ Price constraints
  if (isNaN(data.price)) return "Course price must be a valid number.";

  if (data.price < 0) return "Course price cannot be negative.";

  // 4️⃣ Date validation
  const startDate = new Date(data.date);
  if (isNaN(startDate.getTime())) return "Invalid start date.";

  const now = new Date();
  if (startDate < now) return "Start date must be in the future.";

  // ✅ All checks passed
  return null;
};

export const validateCreateLectureForm = (
  data: CreateLectureData
): string | null => {
  const { title, time } = data;

  // Check title
  if (!title || title.trim().length === 0) {
    return "Lecture title is required.";
  }
  if (title.trim().length < 3) {
    return "Lecture title must be at least 3 characters long.";
  }

  // Check time
  if (!time || time.trim().length === 0) {
    return "Lecture time is required.";
  }

  // Optional: validate time format (e.g., HH:MM)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(time)) {
    return "Invalid time format. Please use HH:MM (24-hour) format.";
  }

  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  const lectureTime = new Date();

  lectureTime.setHours(hours, minutes, 0, 0);

  // If lecture time is before current time → invalid (past time)
  if (lectureTime < now) {
    return "Lecture time must be later than the current time.";
  }

  // If difference is less than 2 hours → invalid
  const diffInMs = lectureTime.getTime() - now.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours < 2) {
    return "Lecture time must be at least 2 hours from now.";
  }

  // Optional: if you want to ensure it's still *today* (not after midnight)
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (lectureTime > endOfToday) {
    return "Lecture time must be for today only.";
  }

  return null;
};
