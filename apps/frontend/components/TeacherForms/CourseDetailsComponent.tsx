"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  Video,
  FileText,
  Award,
  TrendingUp,
  User,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Enhanced API Response with dummy data
const enhancedCourseData = {
  success: true,
  course: {
    id: "8e1090e8-3237-4c07-9b24-62b28f6ba360",
    name: "Advanced Web Development Masterclass",
    description:
      "Master modern web development with React, Node.js, and TypeScript. Build real-world projects and learn industry best practices from experienced developers.",
    price: 34433,
    startDate: "2025-12-18T18:30:00.000Z",
    createdAt: "2025-12-11T06:58:14.619Z",
    updatedAt: "2025-12-11T06:58:14.619Z",
    teacherId: "9505363a-afbb-4bab-b2e2-08c16ad28d2e",

    // Additional fields (suggested)
    status: "ACTIVE", // ACTIVE, DRAFT, COMPLETED, CANCELLED
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    category: "Web Development",
    level: "Intermediate", // Beginner, Intermediate, Advanced
    duration: "12 weeks",
    language: "English",
    prerequisites: ["Basic HTML/CSS", "JavaScript fundamentals", "Git basics"],
    learningOutcomes: [
      "Build full-stack web applications",
      "Master React and its ecosystem",
      "Implement RESTful APIs with Node.js",
      "Deploy applications to production",
      "Work with databases and authentication",
    ],

    teacher: {
      id: "9505363a-afbb-4bab-b2e2-08c16ad28d2e",
      userId: "0fa6fc5f-1acb-4ff2-a615-8d1133cc5d72",
      bio: "Full-stack developer with 10+ years of experience in web technologies",
      expertise: "React, Node.js, TypeScript, System Design",
      experience: 10,
      verifyStatus: true,
      user: {
        id: "0fa6fc5f-1acb-4ff2-a615-8d1133cc5d72",
        username: "Dr. Sarah Johnson",
        email: "teacher2@gmail.com",
      },
    },

    // Statistics
    stats: {
      totalEnrollments: 156,
      activeStudents: 142,
      completedStudents: 14,
      totalLectures: 48,
      completedLectures: 12,
      avgAttendance: 89.5,
      avgRating: 4.7,
      totalRevenue: 5370348,
    },

    // Lectures
    lectures: [
      {
        id: "1",
        title: "Introduction to Modern Web Development",
        startTime: "2024-12-15T10:00:00Z",
        duration: 90,
        status: "COMPLETED",
        attendanceCount: 140,
      },
      {
        id: "2",
        title: "React Fundamentals and Hooks",
        startTime: "2024-12-17T10:00:00Z",
        duration: 120,
        status: "COMPLETED",
        attendanceCount: 138,
      },
      {
        id: "3",
        title: "State Management with Context API",
        startTime: "2024-12-20T10:00:00Z",
        duration: 90,
        status: "NOT_STARTED",
        attendanceCount: 0,
      },
    ],

    // Enrolled Students (recent)
    recentStudents: [
      {
        id: "1",
        username: "John Doe",
        email: "john@example.com",
        enrolledAt: "2024-12-01T10:00:00Z",
        attendance: 95,
        status: "ACTIVE",
      },
      {
        id: "2",
        username: "Jane Smith",
        email: "jane@example.com",
        enrolledAt: "2024-12-02T14:30:00Z",
        attendance: 88,
        status: "ACTIVE",
      },
      {
        id: "3",
        username: "Mike Johnson",
        email: "mike@example.com",
        enrolledAt: "2024-12-03T09:15:00Z",
        attendance: 92,
        status: "ACTIVE",
      },
    ],

    // Homeworks
    homeworks: [
      {
        id: "1",
        title: "Build a React Todo App",
        dueDate: "2024-12-25T23:59:59Z",
        submissions: 120,
        totalStudents: 142,
        avgScore: 85.5,
      },
      {
        id: "2",
        title: "Create REST API with Node.js",
        dueDate: "2025-01-05T23:59:59Z",
        submissions: 0,
        totalStudents: 142,
        avgScore: 0,
      },
    ],
  },
};

const CourseDetailsComponent = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        // Replace with: const response = await fetch(`/api/courses/${courseId}`);
        setTimeout(() => {
          setCourseData(enhancedCourseData.course);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch course:", error);
        toast.error("Failed to load course details");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleEdit = () => {
    router.push(`/teacher/courses/${courseId}/edit`);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        // Add delete API call
        toast.success("Course deleted successfully");
        router.push("/teacher/my-courses");
      } catch (error) {
        toast.error("Failed to delete course");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading course details...</p>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-500">Course not found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Course Banner */}
      <Card className="shadow-lg overflow-hidden">
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
          {courseData.thumbnail && (
            <img
              src={courseData.thumbnail}
              alt={courseData.name}
              className="w-full h-full object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-white/20 backdrop-blur-sm">
                {courseData.category}
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-sm">
                {courseData.level}
              </Badge>
              <Badge
                className={`${
                  courseData.status === "ACTIVE"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {courseData.status}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{courseData.name}</h1>
            <p className="text-white/90 max-w-3xl">{courseData.description}</p>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {courseData.stats.totalEnrollments}
                </p>
                <p className="text-sm text-gray-500">Total Enrollments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{(courseData.stats.totalRevenue / 100000).toFixed(1)}L
                </p>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {courseData.stats.completedLectures}/
                  {courseData.stats.totalLectures}
                </p>
                <p className="text-sm text-gray-500">Lectures Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {courseData.stats.avgRating}/5
                </p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Info & Teacher Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Details */}
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Course Information
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span className="font-semibold">
                  ₹{courseData.price.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Starts: {formatDate(courseData.startDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>{courseData.stats.avgAttendance}% Avg Attendance</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Prerequisites
              </h4>
              <div className="flex flex-wrap gap-2">
                {courseData.prerequisites.map((prereq: string, idx: number) => (
                  <Badge key={idx} variant="secondary">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                What You'll Learn
              </h4>
              <ul className="space-y-2">
                {courseData.learningOutcomes.map(
                  (outcome: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Teacher Info */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Instructor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                {courseData.teacher.user.username
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </div>
              <h3 className="font-semibold text-lg text-gray-800">
                {courseData.teacher.user.username}
              </h3>
              {courseData.teacher.verifyStatus && (
                <Badge className="mt-2 bg-green-100 text-green-700">
                  <Award className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{courseData.teacher.user.email}</span>
              </div>
              {courseData.teacher.experience && (
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{courseData.teacher.experience} years experience</span>
                </div>
              )}
            </div>

            {courseData.teacher.bio && (
              <p className="text-sm text-gray-600 border-t pt-3">
                {courseData.teacher.bio}
              </p>
            )}

            {courseData.teacher.expertise && (
              <div className="border-t pt-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Expertise:
                </p>
                <p className="text-sm text-gray-600">
                  {courseData.teacher.expertise}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <Tabs defaultValue="lectures" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="lectures">
                <Video className="w-4 h-4 mr-2" />
                Lectures ({courseData.lectures.length})
              </TabsTrigger>
              <TabsTrigger value="students">
                <Users className="w-4 h-4 mr-2" />
                Students ({courseData.recentStudents.length})
              </TabsTrigger>
              <TabsTrigger value="homework">
                <FileText className="w-4 h-4 mr-2" />
                Homework ({courseData.homeworks.length})
              </TabsTrigger>
            </TabsList>

            {/* Lectures Tab */}
            <TabsContent value="lectures" className="mt-4">
              <div className="space-y-3">
                {courseData.lectures.map((lecture: any, idx: number) => (
                  <div
                    key={lecture.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {lecture.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(lecture.startTime)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lecture.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {lecture.attendanceCount} attended
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={
                        lecture.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {lecture.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students" className="mt-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Student
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">
                        Enrolled
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">
                        Attendance
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {courseData.recentStudents.map((student: any) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {student.username}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {student.email}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {formatDate(student.enrolledAt)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-semibold text-gray-800">
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge
                            className={
                              student.status === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }
                          >
                            {student.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Homework Tab */}
            <TabsContent value="homework" className="mt-4">
              <div className="space-y-3">
                {courseData.homeworks.map((hw: any) => (
                  <div
                    key={hw.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {hw.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>Due: {formatDate(hw.dueDate)}</span>
                        <span>
                          {hw.submissions}/{hw.totalStudents} submitted
                        </span>
                        {hw.avgScore > 0 && (
                          <span>Avg Score: {hw.avgScore}%</span>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetailsComponent;
