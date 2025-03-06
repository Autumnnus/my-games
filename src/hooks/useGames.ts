import { useQuery } from "@tanstack/react-query";
import * as gamesService from "../services/gamesService";

export const useUserGames = (id: string) => {
  return useQuery({
    queryKey: ["userGames"],
    queryFn: () => gamesService.getUserGames(id),
  });
};
