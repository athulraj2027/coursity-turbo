import type { Router, WebRtcTransport } from "mediasoup/types";

export const createWebRtcTransport = async (router: Router) => {
  const transport = await router.createWebRtcTransport({
    listenIps: [
      { ip: "0.0.0.0", announcedIp: process.env.ANNOUNCED_IP || "127.0.0.1" },
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
  });

  console.log("🚚 WebRTC Transport created:", transport.id);

  return {
    transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    },
  };
};

export const connectTransport = async (
  transport: WebRtcTransport,
  dtlsParameters: any
) => {
  await transport.connect({ dtlsParameters });
  console.log("🔗 Transport connected:", transport.id);
};
