export const signupUser = async (email: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.message || "Sending email failed.");
  }

  return data;
};

export const verifyOtp = async (
  otp: string,
  email: string,
  password: string,
  role: string,
  username: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, email, password, role, username }),
    }
  );

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.message || "OTP verification failed.");
  }

  return data;
};

export const signinUser = async (email: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.message || "Signin failed");
  }
  return data;
};

export const createCourse = async (
  name: string,
  description: string,
  date: Date,
  price: number
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, date, price }),
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.message || "Course creation failed");
  }
  return data;
};

export const fetchMyCourses = async (page = 1, limit = 10) => {
  console.log(
    "Requesting:",
    `${process.env.NEXT_PUBLIC_API_URL}/courses/my?page=${page}&limit=${limit}`
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/my?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await res.json();
  console.log("data received : ", data);
  if (!res.ok) {
    throw new Error(data.message || "Fetching courses failed");
  }
  return data;
};

export const fetchCourseDetails = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Fetching courses failed");
  }
  return data;
};

export const createLecture = async (
  courseId: string,
  title: string,
  time: string
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lectures`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ courseId, title, time }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Creating lecture failed");
  }
  return data;
};

export const fetchMyScheduledClasses = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lectures/my`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "fetching lectures failed");
  }

  return data;
};

export const editLecture = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lectures`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Editing lecture failed");
  }
  return data;
};

export const dltLecture = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lectures`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Deleting lecture failed");
  }
  return data;
};

export const startLectureApi = async (lectureId: string) => {};

export const createMeetingId = async (lectureId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/lectures/${lectureId}`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Creating meetingId failed");
  }
  return data;
};

export const verifyEnrollments = async (id: string) => {
  const params = new URLSearchParams({ meetingId: id });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/enrollments/verify?${params.toString()}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "verifying enrollments failed");
  }

  return data;
};
