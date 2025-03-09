"use client";
import GameDetailTitle from "@/app/games/[games]/[gameDetail]/_component/GameDetailTitle";
import IGDBGameDetail from "@/app/games/[games]/[gameDetail]/_component/IgdbGameDetail";
import Screenshots from "@/app/games/[games]/[gameDetail]/_component/ScreenShots";
import { GamesData } from "@/types/games";
import { Space } from "antd";

export default function GameDetail() {
  const game: GamesData = {
    igdb: {
      cover: {
        id: 289589,
        url: "//images.igdb.com/igdb/image/upload/t_thumb/co67g5.jpg",
        game: 127346,
      },
      id: 127346,
      first_release_date: 1708560000,
      category: 0,
      game_modes: [
        {
          id: 1,
          name: "Single player",
          _id: "67c7406f4853c0b92413dda5",
        },
        {
          id: 2,
          name: "Multiplayer",
          _id: "67c7406f4853c0b92413dda6",
        },
        {
          id: 3,
          name: "Co-operative",
          _id: "67c7406f4853c0b92413dda7",
        },
      ],
      genres: [
        {
          id: 13,
          name: "Simulator",
          _id: "67c7406f4853c0b92413dda8",
        },
        {
          id: 31,
          name: "Adventure",
          _id: "67c7406f4853c0b92413dda9",
        },
        {
          id: 32,
          name: "Indie",
          _id: "67c7406f4853c0b92413ddaa",
        },
      ],
      player_perspectives: [
        {
          id: 1,
          name: "First person",
          _id: "67c7406f4853c0b92413ddab",
        },
      ],
      release_dates: [
        {
          id: 554501,
          date: 1677110400,
          _id: "67c7406f4853c0b92413ddac",
        },
        {
          id: 554502,
          date: 1708560000,
          _id: "67c7406f4853c0b92413ddad",
        },
      ],
      themes: [
        {
          id: 1,
          name: "Action",
          _id: "67c7406f4853c0b92413ddae",
        },
        {
          id: 19,
          name: "Horror",
          _id: "67c7406f4853c0b92413ddaf",
        },
        {
          id: 21,
          name: "Survival",
          _id: "67c7406f4853c0b92413ddb0",
        },
      ],
      involved_companies: [],
    },
    _id: "67c7406f4853c0b92413dda4",
    name: "Sons of the Forest",
    photo: "//images.igdb.com/igdb/image/upload/t_1080p/co67g5.jpg",
    lastPlay: "2025-03-04T00:00:00.000Z",
    platform: "steam",
    status: "toBeCompleted",
    playTime: 8,
    screenshotSize: 0,
    userId: "661400f4b4ade3d661e4d847",
    isFavorite: false,
    createdAt: "2025-03-04T18:03:27.511Z",
    updatedAt: "2025-03-06T10:40:30.793Z",
    slug: "sons-of-the-forest",
    __v: 0,
  };
  return (
    <Space direction="vertical" size="middle" style={{ padding: "40px 80px" }}>
      <GameDetailTitle game={game} />
      {game.igdb?.id && <IGDBGameDetail game={game} />}
      <Screenshots />
      {/* <EditGame
        isEditGameDialogOpen={isEditGameDialogOpen}
        setIsEditGameDialogOpen={setIsEditGameDialogOpen}
      />
      <DeleteGame
        isDeleteGameDialogOpen={isDeleteGameDialogOpen}
        setIsDeleteGameDialogOpen={setIsDeleteGameDialogOpen}
      />
      <AddScreenShot />
      <EditScreenShot />
      <DeleteScreenshot />
      <PreviewScreenShot /> */}
    </Space>
  );
}
