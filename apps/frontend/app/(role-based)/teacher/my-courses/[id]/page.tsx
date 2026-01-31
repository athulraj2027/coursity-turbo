import { SidebarDemo } from "@/components/Dashboard";
import CourseDetailsComponent from "@/components/TeacherForms/CourseDetailsComponent";
import React from "react";

export default function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const header = "Course Details";
 
  return (
    <SidebarDemo header={header} role="teacher">
      <CourseDetailsComponent courseId={params.id} />
    </SidebarDemo>
  );
}
