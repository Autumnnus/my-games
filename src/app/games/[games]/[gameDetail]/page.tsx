import GameDetailTitle from '@/app/games/[games]/[gameDetail]/_component/GameDetailTitle';
import IGDBGameDetail from '@/app/games/[games]/[gameDetail]/_component/IgdbGameDetail';
import Screenshots from '@/app/games/[games]/[gameDetail]/_component/ScreenShots';
import { Flex } from 'antd';

export default function GameDetail() {
  return (
    <Flex gap="20px" vertical style={{ padding: '40px' }}>
      <GameDetailTitle />
      <IGDBGameDetail />
      <Screenshots />
    </Flex>
  );
}
