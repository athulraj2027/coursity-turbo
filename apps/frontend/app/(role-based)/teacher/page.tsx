import { SidebarDemo } from "@/components/Dashboard";
import TeacherDashboard from "@/components/TeacherForms/TeacherDashboard";

export default function TeacherDashboardPage() {
  const header = "Dashboard";
  return (
    <SidebarDemo header={header} role="teacher">
      <TeacherDashboard />
    </SidebarDemo>
  );
}
