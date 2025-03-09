import { Screenshot } from "@/types/screenshot";
import apiClient from "./apiClient";

const baseUrl = "/screenshot";

export const getScreenshots = async (id: string): Promise<Screenshot[]> => {
  const { data } = await apiClient.get(`${baseUrl}/${id}`);

  return data.data || [];
};
