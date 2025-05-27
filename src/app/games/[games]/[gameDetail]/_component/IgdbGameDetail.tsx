'use client';
import Tags from '@/app/games/[games]/[gameDetail]/_component/GameDetailTags';
import { useUserGameDetail } from '@/hooks/useGames';
import { Card, Col, Row } from 'antd';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function IGDBGameDetail() {
  const t = useTranslations();
  const params = useParams();
  const gameId = params.gameDetail as string;
  const { data: game, isLoading } = useUserGameDetail(gameId);
  const developers = game?.igdb?.involved_companies?.filter(item => item.developer);
  const publishers = game?.igdb?.involved_companies?.filter(item => item.publisher);

  return (
    <Card variant="borderless" title={t('igdb_detail')}>
      <Row gutter={[16, 16]}>
        {game?.igdb?.genres?.length && (
          <Col>
            <Tags
              title="genres"
              tags={game.igdb.genres.map(item => ({
                name: item.name,
                id: item.id,
              }))}
            />
          </Col>
        )}
        {game?.igdb?.themes?.length && (
          <Col>
            <Tags
              title="themes"
              tags={game.igdb.themes.map(item => ({
                name: item.name,
                id: item.id,
              }))}
            />
          </Col>
        )}
        {game?.igdb?.player_perspectives?.length && (
          <Col>
            <Tags
              title="player_perspectives"
              tags={game.igdb.player_perspectives.map(item => ({
                name: item.name,
                id: item.id,
              }))}
            />
          </Col>
        )}
        {game?.igdb?.game_modes?.length && (
          <Col>
            <Tags
              title="game_modes"
              tags={game.igdb.game_modes.map(item => ({
                name: item.name,
                id: item.id,
              }))}
            />
          </Col>
        )}
        {developers?.length && (
          <Col>
            <Tags
              title="developers"
              tags={developers.map(item => ({
                name: item.company.name,
                id: item.id,
              }))}
            />
          </Col>
        )}
        {publishers?.length && (
          <Col>
            <Tags
              title="publishers"
              tags={publishers.map(item => ({
                name: item.company.name,
                id: item.id,
              }))}
            />
          </Col>
        )}
      </Row>
    </Card>
  );
}
