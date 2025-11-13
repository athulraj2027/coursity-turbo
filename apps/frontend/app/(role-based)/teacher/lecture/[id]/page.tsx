"use client";
import { Button } from "@/components/ui/button";
import { createMeetingId } from "@/lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LectureLandingPage() {
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [lecture, setLecture] = useState();
  const [meetingId, setMeetingId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraOn(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access camera. Please allow permissions.");
      }
    };
    const fetchLectureDetailsAndCreateMeetingId = async () => {
      const data = await createMeetingId(id as string);
      setLecture(data.lecture);
      setMeetingId(data.meetingId);
      setUserId(data.userId);
    };
    startCamera();
    fetchLectureDetailsAndCreateMeetingId();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          className="w-[640px] h-[360px] object-cover rounded-2xl bg-black"
          autoPlay
          playsInline
        />
      </div>

      <Link href={`/class/${meetingId}?userId=${userId}`}>
        <Button className="my-8 px-12">Start Lecture</Button>
      </Link>
    </div>
  );
}
