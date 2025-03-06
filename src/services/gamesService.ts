import { GamesData } from "@/types/games";
import apiClient from "./apiClient";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getUserGames = async (id: string): Promise<GamesData[]> => {
  const { data } = await apiClient.get(`/games/user/${id}`);

  return data.data;
};
