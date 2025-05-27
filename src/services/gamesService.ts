import { GamesData } from '@/types/games';
import apiClient from './apiClient';

const baseUrl = '/games';

export const userGames = async (id: string): Promise<GamesData[]> => {
  const { data } = await apiClient.get(`${baseUrl}/user/${id}`);

  return data.data;
};

export const userGameDetail = async (id: string): Promise<GamesData> => {
  const { data } = await apiClient.get(`${baseUrl}/game/${id}`);

  return data.data;
};
