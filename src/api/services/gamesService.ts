import { GamesData, IGDBGamesResponse } from '@/types/games';
import { apiClient } from './apiClient';

const baseUrl = '/games';

export const userGames = async (id: string): Promise<GamesData[]> => {
  const { data } = await apiClient().get(`${baseUrl}/user/${id}`);

  return data.data;
};

export const userGameDetail = async (id: string): Promise<GamesData> => {
  const { data } = await apiClient().get(`${baseUrl}/game/${id}`);

  return data.data;
};

export const updateGame = async (id: string, game: GamesData): Promise<GamesData> => {
  const { data } = await apiClient().put(`${baseUrl}/edit/${id}`, game);

  return data.data;
};

export const igdbGames = async (search: string): Promise<IGDBGamesResponse[]> => {
  const { data } = await apiClient().get(`/igdb?search=${search}`);

  return data.data;
};
