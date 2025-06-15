'use client';
import GameDetailRow from '@/app/games/[games]/[gameDetail]/_component/GameDetailRow';
import { useUserGameDetail } from '@/hooks/useGames';
import useAppStore from '@/store/appStore';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Row, Skeleton, Space, Typography } from 'antd';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import DeleteGameModal from './DeleteGameModal';
import EditGameModal from './EditGameModal';

interface Game {
  _id: string;
  name: string;
  photo: string;
  platform: string;
  rating: number;
  status: string;
  playTime: number;
  lastPlay: string;
  review?: string;
  createdAt: string;
  userId: string;
}

export default function GameDetailTitle() {
  const me = useAppStore(state => state.me);
  const params = useParams();
  const gameId = params.gameDetail as string;
  const { data: game, isLoading } = useUserGameDetail(gameId);
  const isOwner = true;
  const loadingGameDetail = isLoading;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEditSuccess = () => {
    // Burada gerekli güncellemeleri yapabilirsiniz
    console.log('Oyun başarıyla güncellendi');
  };

  const handleDeleteSuccess = async () => {
    try {
      // API çağrısı burada yapılacak
      console.log('Oyun siliniyor:', gameId);
      // Silme işlemi başarılı olduktan sonra yönlendirme yapılabilir
    } catch (error) {
      console.error('Silme işlemi başarısız:', error);
      throw error;
    }
  };

  if (!game) {
    return null;
  }

  return (
    <>
      <Card
        variant="borderless"
        title={
          <Row justify="space-between" align="middle">
            <Col>
              {loadingGameDetail ? (
                <Skeleton.Input style={{ width: 200, height: 40, borderRadius: 4 }} active />
              ) : (
                <Typography.Title level={5}>{game.name}</Typography.Title>
              )}
            </Col>
            {!me?.access_token && isOwner && (
              <Col>
                <Space>
                  <Button
                    type="primary"
                    size="middle"
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                  />
                  <Button
                    type="primary"
                    size="middle"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                  />
                </Space>
              </Col>
            )}
          </Row>
        }
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={5}>
            {loadingGameDetail ? (
              <Skeleton.Image style={{ width: '100%', height: 300, borderRadius: 8 }} />
            ) : (
              <Image
                src={game.photo}
                alt={game.name}
                style={{
                  width: '100%',
                  height: 300,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            )}
          </Col>
          <Col xs={24} sm={19}>
            <Space direction="vertical" size="middle" style={{ marginTop: 16 }}>
              {loadingGameDetail ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton.Input
                    key={index}
                    style={{ width: '100%', height: 32, borderRadius: 4 }}
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
                  {game.review && <GameDetailRow title="review" content={game.review} />}
                </>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      <EditGameModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        game={game}
        onSuccess={handleEditSuccess}
      />

      <DeleteGameModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        gameName={game.name}
        onConfirm={handleDeleteSuccess}
      />
    </>
  );
}
