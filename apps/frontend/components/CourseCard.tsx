import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  id: string;
  name: string;
  enrollments: number;
  lectures: number;
  numberOfClasses?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  name,
  lectures,
  enrollments,
}) => {
  const router = useRouter();

  return (
    <Card
      className="group w-full max-w-sm h-[220px] flex flex-col justify-between 
                 border border-gray-200 hover:shadow-lg hover:border-blue-400 
                 transition-all duration-300 rounded-2xl p-4"
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold truncate group-hover:text-blue-600">
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-gray-600 space-y-1">
        <p>Enrollments : {enrollments}</p>
        <p>Lectures : {lectures}</p>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          onClick={() => router.push(`/teacher/my-courses/${id}`)}
          className="text-sm"
        >
          View / Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
