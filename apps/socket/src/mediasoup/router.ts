import type { Router } from "mediasoup/types";
import { createWorker } from "./worker.js";
import { mediaCodecs } from "../config/mediasoupConfig.js";

let worker: any;

export const getOrCreateRouter = async (roomId: string) => {
  if (!worker) worker = await createWorker();
};
