// "use client";

// import { SidebarDemo } from "@/components/Dashboard";
// import CreateLectureForm from "@/components/TeacherForms/CreateLectureForm";
// import { Button } from "@/components/ui/button";
// import { fetchCourseDetails } from "@/lib/api";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function CoursePage() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [lectureCardVisible, setLectureCardVisible] = useState(false);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       const data = await fetchCourseDetails(id as string);
//       setCourse(data.course);
//     };
//     fetchCourse();
//   }, [id]);
//   const header = "Course details";
//   return (
//     <SidebarDemo header={header} role="teacher">
//       <div className="flex gap-3  bottom-3">
//         <Link href={`/teacher/my-courses/`}></Link>
//         <Button onClick={() => setLectureCardVisible(true)}>
//           Schedule a lecture
//         </Button>
//         <Link href={`/teacher/my-courses`}>
//           <Button variant="destructive">Go back</Button>
//         </Link>
//       </div>
//       {lectureCardVisible && (
//         <CreateLectureForm
//           courseId={id as string}
//           onClose={() => setLectureCardVisible(false)}
//         />
//       )}
//     </SidebarDemo>
//   );
// }

import { SidebarDemo } from "@/components/Dashboard";
import CourseDetailsComponent from "@/components/TeacherForms/CourseDetailsComponent";

export default function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const header = "Course Details";
  return (
    <SidebarDemo header={header} role="teacher">
      <CourseDetailsComponent courseId={params.id as string} />
    </SidebarDemo>
  );
}
