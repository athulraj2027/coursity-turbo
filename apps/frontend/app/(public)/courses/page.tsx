import { Input } from "@/components/ui/input";
import MiniHeader from "@/components/ui/MiniHeader";

export default function CoursesPage() {
  return (
    <MiniHeader heading="Explore Courses">
      <div className="flex justify-around">
        {/* Sort options */}{" "}
        <Input
          className="w-64 bg-white text-blue-950 rounded-sm"
          type="text"
          placeholder="Search courses"
        />
      </div>
    </MiniHeader>
  );
}
