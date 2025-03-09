"use client";

import GameDetailRow from "@/app/games/[games]/[gameDetail]/_component/GameDetailRow";
import useAppStore from "@/store/appStore";
import { GamesData } from "@/types/games";
import {
  DeleteOutlined,
  EditOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Button, Image, Skeleton, Space, Typography } from "antd";
export default function GameDetailTitle({
  game,
  isLoading,
}: {
  game?: GamesData | undefined;
  isLoading: boolean;
}) {
  const me = useAppStore((state) => state.me);
  // const isOwner = useMemo(() => game.userId === token?.id, [game.userId, token?.id]);
  const isOwner = true;
  const loadingGameDetail = !game || isLoading;

  return (
    <Space direction="horizontal" size={24} style={{ flexWrap: "wrap" }}>
      {loadingGameDetail ? (
        <Skeleton.Image
          style={{ width: "20rem", height: "24rem", borderRadius: 8 }}
        />
      ) : (
        <Image
          src={game?.photo}
          alt={game?.name}
          style={{
            width: "20rem",
            height: "24rem",
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      )}
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {loadingGameDetail ? (
            <Skeleton.Input
              style={{ width: "15rem", height: "3rem", borderRadius: 4 }}
              active
            />
          ) : (
            <Typography.Title level={3}>{game?.name}</Typography.Title>
          )}
          <Space
            style={{ display: me?.access_token && isOwner ? "flex" : "none" }}
          >
            <Button
              //   onClick={setIsAddScreenshotDialogOpen}
              type="primary"
              icon={<PictureOutlined />}
            />
            <Button
              //   onClick={setIsEditGameDialogOpen}
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              //   onClick={setIsDeleteGameDialogOpen}
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </Space>
        </Space>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {loadingGameDetail ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton.Input
                key={index}
                style={{ width: "100%", height: "2rem", borderRadius: 4 }}
                active
              />
            ))
          ) : (
            <>
              <GameDetailRow title="platform" content={game.platform} />
              <GameDetailRow title="rating" content={game.rating} />
              <GameDetailRow title="status" content={game.status} />
              <GameDetailRow title="playTime" content={game.playTime} />
              <GameDetailRow title="lastPlay" content={game.lastPlay} />
              {game.review && (
                <GameDetailRow title="review" content={game.review} />
              )}
            </>
          )}
        </Space>
      </Space>
    </Space>
  );
}
