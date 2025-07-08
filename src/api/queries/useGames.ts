import { GamesData } from '@/types/games';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as gamesService from '../services/gamesService';

export const useUserGames = (id: string) => {
  return useQuery({
    queryKey: ['userGames'],
    queryFn: () => gamesService.userGames(id),
  });
};

export const useUserGameDetail = (id: string) => {
  return useQuery({
    queryKey: ['userGameDetail'],
    queryFn: () => gamesService.userGameDetail(id),
  });
};

export const useUpdateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, params }: { id: string; params: GamesData }) =>
      gamesService.updateGame(id, params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['game-update'] }),
  });
};

export const useIgdbGames = (search: string) => {
  return useQuery({
    queryKey: ['igdbGames', search],
    queryFn: () => gamesService.igdbGames(search),
    enabled: !!search,
  });
};
