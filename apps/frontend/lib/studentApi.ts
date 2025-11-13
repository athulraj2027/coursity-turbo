export const fetchAllCoursesApi = async (page = 1, limit = 10) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses?page=${page}&limit=${limit}`,
    {
      method: "GET",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Fetching courses failed.");
  }
  return data;
};

export const fetchCourseDetailsApi = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
    method: "GET",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Fetching course failed.");
  }
  return data;
};

export const fetchEnrolledCoursesApi = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/enrolled`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Fetching course failed.");
  }
  return data;
};

export const fetchUpcomingClassesApi = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/lectures/upcoming`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Fetching lectures failed.");
  }
  return data;
};
