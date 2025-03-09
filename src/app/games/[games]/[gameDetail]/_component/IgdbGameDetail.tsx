"use client";

import Tags from "@/app/games/[games]/[gameDetail]/_component/GameDetailTags";
import { GamesData } from "@/types/games";
import { Space, Typography } from "antd";
import { useTranslations } from "next-intl";
export default function IGDBGameDetail({ game }: { game: GamesData }) {
  const t = useTranslations();
  const developers = game.igdb?.involved_companies?.filter(
    (item) => item.developer
  );
  const publishers = game.igdb?.involved_companies?.filter(
    (item) => item.publisher
  );

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Typography.Title level={3}>IGDB {t("game_details")}</Typography.Title>
      <Space wrap>
        {game.igdb?.genres?.length ? (
          <div>
            <Tags
              title="genres"
              tags={game.igdb.genres.map((item) => ({
                name: item.name,
                id: item.id,
              }))}
            />
          </div>
        ) : null}
        {game.igdb?.themes?.length ? (
          <div>
            <Tags
              title="themes"
              tags={game.igdb.themes.map((item) => ({
                name: item.name,
                id: item.id,
              }))}
            />
          </div>
        ) : null}
        {game.igdb?.player_perspectives?.length ? (
          <div>
            <Tags
              title="player_perspectives"
              tags={game.igdb.player_perspectives.map((item) => ({
                name: item.name,
                id: item.id,
              }))}
            />
          </div>
        ) : null}
      </Space>
      <Space wrap>
        {game.igdb?.game_modes?.length ? (
          <div>
            <Tags
              title="game_modes"
              tags={game.igdb.game_modes.map((item) => ({
                name: item.name,
                id: item.id,
              }))}
            />
          </div>
        ) : null}
        {developers?.length ? (
          <div>
            <Tags
              title="developers"
              tags={developers.map((item) => ({
                name: item.company.name,
                id: item.id,
              }))}
            />
          </div>
        ) : null}
        {publishers?.length ? (
          <div>
            <Tags
              title="publishers"
              tags={publishers.map((item) => ({
                name: item.company.name,
                id: item.id,
              }))}
            />
          </div>
        ) : null}
      </Space>
    </Space>
  );
}
