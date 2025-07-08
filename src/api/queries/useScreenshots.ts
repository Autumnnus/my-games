import { useQuery } from '@tanstack/react-query';
import * as screenshootService from '../services/screenshootService';

export const useScreenshots = (id: string) => {
  return useQuery({
    queryKey: ['getScreenshots'],
    queryFn: () => screenshootService.getScreenshots(id),
  });
};
