import { GamesData, IGDBGamesData, IGDBGamesResponse } from '@/types/games';
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

export const igdbGames = async (search: string): Promise<IGDBGamesData[]> => {
  const { data } = (await apiClient().get(`/igdb?search=${search}`)) as {
    data: IGDBGamesResponse[];
  };

  return data.map(game => ({
    id: game.id,
    name: game.name,
    cover: game.cover,
    summary: game.summary ?? '',
    slug: game.slug,
    aggregated_rating: game.aggregated_rating ?? 0,
    aggregated_rating_count: game.aggregated_rating_count ?? 0,
    publishers:
      game.involved_companies
        ?.filter(company => company.publisher === true)
        ?.map(company => ({
          name: company.company.name,
          id: company.company.id,
        })) ?? [],
    developers:
      game.involved_companies
        ?.filter(company => company.developer === true)
        ?.map(company => ({
          name: company.company.name,
          id: company.company.id,
        })) ?? [],
    genres: game.genres ?? [],
    player_perspectives: game.player_perspectives ?? [],
    game_modes: game.game_modes ?? [],
    themes: game.themes ?? [],
    release_dates: game.release_dates ?? [],
  }));
};
