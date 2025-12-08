"use client";
import { verifyEnrollments } from "@/lib/api";
import socket from "@/lib/socket";
import * as mediasoupClient from "mediasoup-client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ClassPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const joinClass = async (user: object) => {
      socket.emit("join-room", { user, roomId: id }, async (rtp: any) => {
        const device = new mediasoupClient.Device();
        console.log("New device created : ", device);
        await device.load({ routerRtpCapabilities: rtp });
        console.log("device loaded : ", device.loaded);

        // create send transport
        socket.emit("create-transport", async (params: any) => {
          const transport = device.createSendTransport(params);
          transport.on("connect", () => {});

          transport.on("produce", () => {});
        });

        // create recv transport
        socket.emit("create-transport", async (params: any) => {
          const transport = device.createRecvTransport(params);
          transport.on("connect", () => {});
        });
      });
    };
    const fetchData = async () => {
      try {
        const data = await verifyEnrollments(id as string);

        console.log("Verify response:", data);

        if (!data.success || !data.access) {
          router.replace("/unauthorized");
        }

        joinClass(data.user);
      } catch (err) {
        console.error("Error verifying:", err);
        router.replace("/unauthorized");
      }
    };

    fetchData();
  });

  return (
    <>
      <ClassHeader />
    </>
  );
}

const ClassHeader = () => {
  return (
    <div className="bg-black h-[20%] p-2">
      <h1 className="font-extrabold text-white text-xl">Coursity</h1>
    </div>
  );
};
