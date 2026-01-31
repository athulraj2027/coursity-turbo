import { SidebarDemo } from "@/components/Dashboard";
import CreateCourseForm from "@/components/TeacherForms/CreateCourseForm";

export default function CreateCoursePage() {
  const header = "Create new course";
  return (
    <SidebarDemo header={header} role="teacher">
      <CreateCourseForm />
    </SidebarDemo>
  );
}
