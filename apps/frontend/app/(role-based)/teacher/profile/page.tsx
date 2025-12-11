import { SidebarDemo } from "@/components/Dashboard";
import TeacherProfileComponent from "@/components/TeacherForms/TeacherProfileComponent";

export default function TeacherProfilePage() {
  const header = "My Profile";
  return (
    <SidebarDemo header={header} role="teacher">
      <TeacherProfileComponent />
    </SidebarDemo>
  );
}
