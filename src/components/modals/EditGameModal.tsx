'use client';
import { useUpdateGame } from '@/hooks/useGames';
import usePlatforms from '@/hooks/usePlatforms';
import useGameDetailStore from '@/store/gameDetail';
import { GamesData, Status } from '@/types/games';
import {
  Avatar,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const { Panel } = Collapse;

interface IGDBGameData {
  name: string;
  summary?: string;
  cover?: {
    url: string;
  };
  release_dates?: {
    date: number;
  }[];
  aggregated_rating?: number;
  developers?: { name: string }[];
  publishers?: { name: string }[];
  genres?: { name: string }[];
  themes?: { name: string }[];
  player_perspectives?: { name: string }[];
  game_modes?: { name: string }[];
}

export default function EditGameModal({ game }: { game?: GamesData | undefined }) {
  const t = useTranslations();
  const [form] = Form.useForm();
  const [isIGDBAPIOpen, setIsIGDBAPIOpen] = useState(true);
  const [selectedGameData, setSelectedGameData] = useState<IGDBGameData | null>(null);
  const [searchResults, setSearchResults] = useState<
    { value: string; label: string; data: IGDBGameData }[]
  >([]);

  const gameStore = useGameDetailStore(state => state.selectedGame);
  const [selectedGame, setSelectedGame] = useState(game);

  useEffect(() => {
    if (gameStore) {
      setSelectedGame(gameStore);
    }
  }, [gameStore]);

  const isOpen = useGameDetailStore(state => state.isEditGameModalOpen);
  const onClose = useGameDetailStore(state => state.toggleEditGameModal);

  useEffect(() => {
    if (selectedGame) {
      form.setFieldsValue({
        name: selectedGame.name,
        photo: selectedGame.photo,
        platform: selectedGame.platform,
        rating: selectedGame.rating,
        status: selectedGame.status,
        playTime: selectedGame.playTime,
        lastPlay: selectedGame.lastPlay ? dayjs(selectedGame.lastPlay) : undefined,
        review: selectedGame.review,
      });
    }
  }, [selectedGame, form]);

  const photo = Form.useWatch(['photo'], form);
  const { mutateAsync: updateMutate, isPending: updateIsPending } = useUpdateGame();

  const handleOk = async () => {
    if (!selectedGame?._id) {
      return;
    }

    try {
      const values = await form.validateFields();
      updateMutate({
        id: selectedGame?._id,
        params: values,
      });
      onClose();
    } catch (error) {
      console.error('Form doğrulama hatası:', error);
    }
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const handleGameSearch = async (value: string) => {
    if (!value) return;

    try {
      const response = await axios.get(`/api/igdb/search?query=${value}`);
      setSearchResults(
        response.data.map((game: IGDBGameData) => ({
          value: game.name,
          label: game.name,
          data: game,
        }))
      );
    } catch (error) {
      console.error('IGDB arama hatası:', error);
    }
  };

  const handleGameSelect = (value: string) => {
    const selectedGame = searchResults.find(result => result.value === value)?.data;
    if (selectedGame) {
      setSelectedGameData(selectedGame);
      form.setFieldsValue({
        name: selectedGame.name,
        photo: selectedGame.cover?.url?.replace('t_thumb', 't_1080p'),
      });
    }
  };

  const platforms = usePlatforms();

  return (
    <Modal
      title="Oyunu Düzenle"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      confirmLoading={updateIsPending}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: selectedGame?.name,
          photo: selectedGame?.photo,
          platform: selectedGame?.platform,
          rating: selectedGame?.rating,
          status: selectedGame?.status,
          playTime: selectedGame?.playTime,
          lastPlay: selectedGame?.lastPlay ? dayjs(selectedGame.lastPlay) : undefined,
          review: selectedGame?.review,
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row align="middle" justify="space-between">
            <Col>
              <Typography.Text>IGDB API Kullan</Typography.Text>
            </Col>
            <Col>
              <Switch checked={isIGDBAPIOpen} onChange={setIsIGDBAPIOpen} />
            </Col>
          </Row>

          {isIGDBAPIOpen ? (
            <Form.Item
              name="name"
              label="Oyun Adı"
              rules={[{ required: true, message: 'Lütfen oyun adını giriniz!' }]}
            >
              <Select
                showSearch
                placeholder="Oyun ara..."
                onSearch={handleGameSearch}
                onChange={handleGameSelect}
                options={searchResults}
                filterOption={false}
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="name"
              label="Oyun Adı"
              rules={[{ required: true, message: 'Lütfen oyun adını giriniz!' }]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item name="photo" label="Oyun Fotoğrafı">
            <Input prefix={photo && <Avatar src={photo} size={40} style={{ marginRight: 8 }} />} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="playTime"
                label="Oynama Süresi (Saat)"
                rules={[{ required: true, message: 'Lütfen oynama süresini giriniz!' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="platform"
                label="Platform"
                rules={[{ required: true, message: 'Lütfen platform seçiniz!' }]}
              >
                <Select>
                  {platforms.map(platform => (
                    <Select.Option key={platform.value} value={platform.value}>
                      {platform.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rating"
                label="Puan"
                rules={[{ required: true, message: 'Lütfen puan giriniz!' }]}
              >
                <InputNumber min={0} max={10} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Durum"
                rules={[{ required: true, message: 'Lütfen durum seçiniz!' }]}
              >
                <Select>
                  {Object.values(Status).map(status => (
                    <Select.Option key={status} value={status}>
                      {t(status)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="lastPlay"
            label="Son Oynama Tarihi"
            rules={[{ required: true, message: 'Lütfen son oynama tarihini seçiniz!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="review" label="İnceleme">
            <Input.TextArea rows={4} />
          </Form.Item>

          {selectedGameData && (
            <Collapse>
              <Panel header="Oyun Detayları" key="1">
                <Space direction="vertical" style={{ width: '100%' }}>
                  {selectedGameData.summary && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Özet:{' '}
                      </Typography.Text>
                      <Typography.Text>{selectedGameData.summary}</Typography.Text>
                    </div>
                  )}
                  {selectedGameData.release_dates?.[0] && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Çıkış Tarihi:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {new Date(
                          selectedGameData.release_dates[0].date * 1000
                        ).toLocaleDateString()}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedGameData.aggregated_rating && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        IGDB Puanı:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedGameData.aggregated_rating.toFixed(2)}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedGameData.developers && selectedGameData.developers.length > 0 && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Geliştiriciler:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedGameData.developers.map(d => d.name).join(', ')}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedGameData.publishers && selectedGameData.publishers.length > 0 && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Yayıncılar:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedGameData.publishers.map(p => p.name).join(', ')}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedGameData.genres && selectedGameData.genres.length > 0 && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Türler:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedGameData.genres.map(g => g.name).join(', ')}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedGameData.themes && selectedGameData.themes.length > 0 && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Temalar:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedGameData.themes.map(t => t.name).join(', ')}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedGameData.player_perspectives &&
                    selectedGameData.player_perspectives.length > 0 && (
                      <div>
                        <Typography.Text strong style={{ color: '#ff3030' }}>
                          Oyuncu Perspektifleri:{' '}
                        </Typography.Text>
                        <Typography.Text>
                          {selectedGameData.player_perspectives.map(p => p.name).join(', ')}
                        </Typography.Text>
                      </div>
                    )}
                  {selectedGameData.game_modes && selectedGameData.game_modes.length > 0 && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Oyun Modları:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedGameData.game_modes.map(m => m.name).join(', ')}
                      </Typography.Text>
                    </div>
                  )}
                </Space>
              </Panel>
            </Collapse>
          )}
        </Space>
      </Form>
    </Modal>
  );
}
