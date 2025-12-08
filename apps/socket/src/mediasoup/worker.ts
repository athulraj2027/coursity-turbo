import * as mediasoup from "mediasoup";

export let worker: mediasoup.types.Worker;

export const createWorker = async () => {
  if (worker) return worker;

  worker = await mediasoup.createWorker({
    rtcMinPort: 40000,
    rtcMaxPort: 49999,
  });

  console.log("✅ Mediasoup worker created");

  worker.on("died", () => {
    console.error("❌ Mediasoup worker died, exiting in 2 seconds...");
    setTimeout(() => process.exit(1), 2000);
  });

  return worker;
};
