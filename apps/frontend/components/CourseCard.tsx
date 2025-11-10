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
  description: string;
  price?: number;
  numberOfClasses?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  name,
  description,
  price,
  
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
        <CardDescription className="text-sm line-clamp-3 text-gray-500">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="text-sm text-gray-600 space-y-1">
        {price !== undefined && <p>💰 Price: ₹{price}</p>}
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
