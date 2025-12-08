"use client";

import { SidebarDemo } from "@/components/Dashboard";
import { fetchCourseDetailsApi } from "@/lib/studentApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaymentButton from "@/components/PaymentBtn";
import { jwtDecode } from "jwt-decode";

export default function CheckoutPage() {
  const header = "Checkout";
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [course, setCourse] = useState<any>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Decode JWT from cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("coursity_token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setEmail(decoded.email);
        console.log("Decoded email:", decoded.email);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchCourseDetailsApi(id as string);
        setCourse(data.course);
      } catch (error: any) {
        console.log("Error  : ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourseDetails();
  }, [id]);

  return (
    <SidebarDemo header={header} role="student">
      <div className="p-6 text-black">
        {loading && (
          <p className="text-lg font-medium">Loading course details...</p>
        )}
        {error && <p className="text-red-600">{error}</p>}

        {course && (
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 border">
            <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
            <p className="text-gray-800 mb-6 leading-relaxed">
              {course.description}
            </p>

            <div className="mb-6 space-y-2">
              <p>
                <span className="font-semibold">Teacher:</span>{" "}
                {course.teacher?.user?.username}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {course.teacher?.user?.email}
              </p>
              <p>
                <span className="font-semibold">Start Date:</span>{" "}
                {new Date(course.startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ₹
                {course.price.toLocaleString()}
              </p>
            </div>

            {/* Payment Rules */}
            <div className="border-t pt-4 mt-6">
              <h2 className="text-2xl font-semibold mb-3">Payment Rules</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>
                  Ensure your payment method is valid and has sufficient
                  balance.
                </li>
                <li>
                  Once paid, the course access will be immediately activated.
                </li>
                <li>Payments are non-refundable once the class starts.</li>
                <li>
                  Do not reload or close the page during payment processing.
                </li>
                <li>Contact support if you face any issue during payment.</li>
              </ul>
            </div>

            {/* Proceed Button */}
            <div className="mt-8 flex justify-end">
              <PaymentButton
                amount={course.price}
                email={email}
                courseId={id as string}
              />
            </div>
          </div>
        )}

        {!loading && !course && !error && (
          <p className="text-gray-700 text-center">No course data available.</p>
        )}
      </div>
    </SidebarDemo>
  );
}
