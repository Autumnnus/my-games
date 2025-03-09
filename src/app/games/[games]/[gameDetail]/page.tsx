"use client";
import GameDetailTitle from "@/app/games/[games]/[gameDetail]/_component/GameDetailTitle";
import IGDBGameDetail from "@/app/games/[games]/[gameDetail]/_component/IgdbGameDetail";
import Screenshots from "@/app/games/[games]/[gameDetail]/_component/ScreenShots";
import { useUserGameDetail } from "@/hooks/useGames";
import { Space } from "antd";
import { useParams } from "next/navigation";

export default function GameDetail() {
  const params = useParams();
  const gameId = params.gameDetail as string;
  const { data, isLoading } = useUserGameDetail(gameId);

  return (
    <Space direction="vertical" size="middle" style={{ padding: "40px 80px" }}>
      <GameDetailTitle game={data} isLoading={isLoading} />
      {data?.igdb?.id && <IGDBGameDetail game={data} />}
      <Screenshots gameId={gameId} />
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
