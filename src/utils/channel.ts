import { Channel } from "@/types/data";

const CHANNELS_KEY = "geek_channels";
export const setLocalChannels = (channels: Channel[]) => {
  localStorage.setItem(CHANNELS_KEY, JSON.stringify(channels));
};

export const getLocalChannels = (): Channel[] => {
  return JSON.parse(localStorage.getItem(CHANNELS_KEY) || "[]");
};
