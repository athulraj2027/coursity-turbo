"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Briefcase,
  BookOpen,
  Users,
  Calendar,
  Award,
  Edit,
  Save,
  X,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

// Sample API Response Type
interface TeacherProfileData {
  user: {
    id: string;
    username: string;
    email: string;
    wallet: number;
    createdAt: string;
  };
  profile: {
    id: string;
    bio: string | null;
    expertise: string | null;
    experience: number | null;
    verifyStatus: boolean;
  };
  stats: {
    totalCourses: number;
    totalLectures: number;
    totalStudents: number;
    avgAttendanceRate: number;
    avgHomeworkScore: number;
  };
}

const TeacherProfileComponent = () => {
  const [profileData, setProfileData] = useState<TeacherProfileData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    expertise: "",
    experience: 0,
  });

  // Sample API response - Replace with actual API call
  const sampleApiResponse: TeacherProfileData = {
    user: {
      id: "teacher-123",
      username: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      wallet: 45000,
      createdAt: "2023-01-15T10:30:00Z",
    },
    profile: {
      id: "profile-456",
      bio: "Passionate educator with over 10 years of experience in computer science and software development. Specialized in web technologies and modern JavaScript frameworks.",
      expertise: "Web Development, React, Node.js, Python, Machine Learning",
      experience: 10,
      verifyStatus: true,
    },
    stats: {
      totalCourses: 8,
      totalLectures: 145,
      totalStudents: 342,
      avgAttendanceRate: 87.5,
      avgHomeworkScore: 82.3,
    },
  };

  useEffect(() => {
    // Simulate API call
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Replace with actual API call: const data = await fetchTeacherProfile();
        setTimeout(() => {
          setProfileData(sampleApiResponse);
          setFormData({
            username: sampleApiResponse.user.username,
            bio: sampleApiResponse.profile.bio || "",
            expertise: sampleApiResponse.profile.expertise || "",
            experience: sampleApiResponse.profile.experience || 0,
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      // Replace with actual API call: await updateTeacherProfile(formData);
      console.log("Saving profile:", formData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);

      // Update local state
      if (profileData) {
        setProfileData({
          ...profileData,
          user: { ...profileData.user, username: formData.username },
          profile: {
            ...profileData.profile,
            bio: formData.bio,
            expertise: formData.expertise,
            experience: formData.experience,
          },
        });
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    if (profileData) {
      setFormData({
        username: profileData.user.username,
        bio: profileData.profile.bio || "",
        expertise: profileData.profile.expertise || "",
        experience: profileData.profile.experience || 0,
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-500">Failed to load profile</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header + Wallet in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Teacher Profile (2/3 width) */}
        <Card className="shadow-md md:col-span-2 lg:col-span-2">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="" alt={profileData.user.username} />
                  <AvatarFallback className="text-3xl bg-blue-600 text-white">
                    {getInitials(profileData.user.username)}
                  </AvatarFallback>
                </Avatar>
                {profileData.profile.verifyStatus && (
                  <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    <Award className="w-4 h-4" />
                    <span className="font-medium">Verified Teacher</span>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <>
                    {/* --- editing form stays same --- */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Name</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={3}
                          value={formData.bio}
                          onChange={(e) =>
                            setFormData({ ...formData, bio: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expertise">Expertise</Label>
                        <Input
                          id="expertise"
                          value={formData.expertise}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expertise: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="number"
                          value={formData.experience}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              experience: Number(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button className="gap-2" onClick={handleSave}>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          className="gap-2"
                          onClick={handleCancel}
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* --- view mode stays same --- */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {profileData.user.username}
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{profileData.user.email}</span>
                    </div>

                    {profileData.profile.bio && (
                      <p className="text-gray-600 mt-2">
                        {profileData.profile.bio}
                      </p>
                    )}

                    {profileData.profile.expertise && (
                      <div className="flex items-start gap-2 text-gray-600">
                        <Award className="w-4 h-4 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-700">
                            Expertise:
                          </p>
                          <p>{profileData.profile.expertise}</p>
                        </div>
                      </div>
                    )}

                    {profileData.profile.experience && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>
                          {profileData.profile.experience} years of experience
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Member since{" "}
                        {new Date(
                          profileData.user.createdAt
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet (1/3 width) */}
        <Card className="shadow-lg md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{profileData.user.wallet.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">Available balance</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Withdraw Funds
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Total Courses */}
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {profileData.stats.totalCourses}
                </p>
                <p className="text-sm text-gray-500">Total Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Lectures */}
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {profileData.stats.totalLectures}
                </p>
                <p className="text-sm text-gray-500">Total Lectures</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Students */}
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {profileData.stats.totalStudents}
                </p>
                <p className="text-sm text-gray-500">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherProfileComponent;
