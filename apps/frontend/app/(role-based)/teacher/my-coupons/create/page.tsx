import { SidebarDemo } from "@/components/Dashboard";
import CreateCouponForm from "@/components/TeacherForms/CreateCouponForm";

export default function CreateCouponPage() {
  const header = "Create New Coupon";
  return (
    <SidebarDemo header={header} role="teacher">
      <CreateCouponForm />
    </SidebarDemo>
  );
}
