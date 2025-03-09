import { useQuery } from "@tanstack/react-query";
import * as gamesService from "../services/gamesService";

export const useUserGames = (id: string) => {
  return useQuery({
    queryKey: ["userGames"],
    queryFn: () => gamesService.userGames(id),
  });
};

export const useUserGameDetail = (id: string) => {
  return useQuery({
    queryKey: ["userGameDetail"],
    queryFn: () => gamesService.userGameDetail(id),
  });
};
