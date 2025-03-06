import { useQuery } from "@tanstack/react-query";
import * as gamesService from "../services/gamesService";

export const useUserGames = () => {
  return useQuery({
    queryKey: ["userGames"],
    queryFn: () => gamesService.getUserGames("661400f4b4ade3d661e4d847"),
  });
};
