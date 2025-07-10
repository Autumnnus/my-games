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

export const useAddGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ params }: { params: GamesData }) => gamesService.addGame(params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userGames'] }),
  });
};

export const useUpdateGame = () => {
  return useMutation({
    mutationFn: ({ id, params }: { id: string; params: GamesData }) =>
      gamesService.updateGame(id, params),
  });
};

export const useDeleteGame = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => gamesService.deleteGame(id),
  });
};

export const useIgdbGames = (search: string) => {
  return useQuery({
    queryKey: ['igdbGames', search],
    queryFn: () => gamesService.igdbGames(search),
    enabled: !!search,
  });
};
