"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { BookOpen, Users, TrendingUp, Award, DollarSign } from "lucide-react";

const dashboardData = {
  overview: {
    totalRevenue: 245000,
    revenueGrowth: 12.5,
    totalStudents: 342,
    studentGrowth: 8.3,
    activeCourses: 8,
    totalLectures: 145,
    avgAttendance: 87.5,
    avgRating: 4.7,
  },
  revenueByMonth: [
    { month: "Jan", revenue: 18000, students: 45 },
    { month: "Feb", revenue: 22000, students: 52 },
    { month: "Mar", revenue: 25000, students: 58 },
    { month: "Apr", revenue: 28000, students: 65 },
    { month: "May", revenue: 31000, students: 72 },
    { month: "Jun", revenue: 35000, students: 80 },
    { month: "Jul", revenue: 38000, students: 88 },
    { month: "Aug", revenue: 42000, students: 95 },
  ],
  attendanceByMonth: [
    { month: "Jan", attendance: 82 },
    { month: "Feb", attendance: 85 },
    { month: "Mar", attendance: 83 },
    { month: "Apr", attendance: 87 },
    { month: "May", attendance: 89 },
    { month: "Jun", attendance: 88 },
    { month: "Jul", attendance: 90 },
    { month: "Aug", attendance: 87 },
  ],
  courseEnrollments: [
    { name: "Web Development Bootcamp", students: 85, revenue: 68000 },
    { name: "React Masterclass", students: 72, revenue: 57600 },
    { name: "Node.js Backend", students: 58, revenue: 46400 },
    { name: "Python for Beginners", students: 65, revenue: 39000 },
    { name: "Machine Learning Basics", students: 42, revenue: 33600 },
  ],
  studentDistribution: [
    { status: "Active", value: 280, color: "#10b981" },
    { status: "Completed", value: 45, color: "#3b82f6" },
    { status: "Inactive", value: 17, color: "#ef4444" },
  ],
};

const TeacherDashboard = () => {
  // FIX: loading first, no data initially
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(dashboardData); // load dummy data
      setLoading(false);
    }, 800);
  }, []);

  if (loading || !data) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3 w-2/3">
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-300 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                  <div className="h-12 w-12 bg-gray-200 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart skeleton rows */}
        {[1, 2].map((i) => (
          <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded"></div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded"></div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, growth, color }: any) => (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            {growth !== undefined && (
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp
                  className={`w-4 h-4 ${
                    growth >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                />
                <span
                  className={`font-medium ${
                    growth >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {growth >= 0 ? "+" : ""}
                  {growth}%
                </span>
                <span className="text-gray-500">vs last month</span>
              </div>
            )}
          </div>
          <div className={`p-4 ${color} rounded-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`₹${(data.overview.totalRevenue / 1000).toFixed(0)}K`}
          growth={data.overview.revenueGrowth}
          color="bg-green-500"
        />
        <StatCard
          icon={Users}
          title="Total Students"
          value={data.overview.totalStudents}
          growth={data.overview.studentGrowth}
          color="bg-blue-500"
        />
        <StatCard
          icon={BookOpen}
          title="Active Courses"
          value={data.overview.activeCourses}
          color="bg-purple-500"
        />
        <StatCard
          icon={Award}
          title="Avg Attendance"
          value={`${data.overview.avgAttendance}%`}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Revenue & Student Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.revenueByMonth}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorStudents"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#3b82f6"
                  fill="url(#colorStudents)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Student Pie */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Student Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.studentDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {data.studentDistribution.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Top Performing Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.courseEnrollments} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
