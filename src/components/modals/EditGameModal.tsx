'use client';
import { useIgdbGames, useUpdateGame } from '@/api/queries/useGames';
import usePlatforms from '@/hooks/usePlatforms';
import useGameDetailStore from '@/store/gameDetail';
import { GamesData, IGDBGamesData, Status } from '@/types/games';
import { useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import {
  Avatar,
  Col,
  Collapse,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

const { Panel } = Collapse;

export default function EditGameModal({ game }: { game?: GamesData | undefined }) {
  const isOpen = useGameDetailStore(state => state.isEditGameModalOpen);
  const onClose = useGameDetailStore(state => state.toggleEditGameModal);
  const gameStore = useGameDetailStore(state => state.selectedGame);

  const [form] = Form.useForm();
  const photo = Form.useWatch(['photo'], form);

  const [selectedGame, setSelectedGame] = useState(game);
  const [isIGDBAPIOpen, setIsIGDBAPIOpen] = useState(!!game?.igdb?.id);
  const [selectedIGDBGame, setSelectedIGDBGame] = useState<IGDBGamesData | null>(null);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data: igdbGames } = useIgdbGames(debouncedSearch);
  const { mutateAsync: updateMutate, isPending: updateIsPending } = useUpdateGame();
  const platforms = usePlatforms();
  const queryClient = useQueryClient();
  const t = useTranslations();

  useEffect(() => {
    if (gameStore) {
      setSelectedGame(gameStore);
      setIsIGDBAPIOpen(!!gameStore?.igdb?.id);
    }
  }, [gameStore]);

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

  const handleGameSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  async function handleOk() {
    if (!selectedGame?._id) {
      return;
    }

    try {
      const values = await form.validateFields();
      await updateMutate(
        {
          id: selectedGame?._id,
          params: values,
        },
        {
          onSuccess: () => {
            if (game) {
              queryClient.invalidateQueries({ queryKey: ['userGameDetail'] });
            } else {
              queryClient.invalidateQueries({ queryKey: ['userGames'] });
            }

            onClose();
          },
        }
      );
    } catch (error) {
      console.error('Form doğrulama hatası:', error);
    }
  }

  function handleCancel() {
    if (updateIsPending) {
      return;
    }

    onClose();
    form.resetFields();
  }

  function handleGameSelect(value: string) {
    const selectedGame = igdbGames?.find(result => result.name === value);
    if (selectedGame) {
      setSelectedIGDBGame(selectedGame);
      form.setFieldsValue({
        name: selectedGame.name,
        photo: selectedGame.cover?.url?.replace('t_thumb', 't_1080p'),
      });
    }
  }

  return (
    <Modal
      title={t('edit_game')}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      confirmLoading={updateIsPending}
      cancelButtonProps={{ disabled: updateIsPending }}
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
                optionLabelProp="label" // ← make sure the selected value shows the label
              >
                {igdbGames?.map(game => (
                  <Select.Option
                    key={game.id}
                    value={game.name}
                    label={game.name} // ← used by optionLabelProp
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {game.cover?.url && (
                        <Image
                          src={`https:${game.cover.url}`} // ← prefix the protocol
                          alt={game.name}
                          preview={false}
                          style={{
                            width: 32,
                            height: 32,
                            objectFit: 'cover',
                            marginRight: 8,
                            borderRadius: 4,
                          }}
                        />
                      )}
                      <span>{game.name}2</span>
                    </div>
                  </Select.Option>
                ))}
              </Select>
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
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item name="review" label="İnceleme">
            <Input.TextArea rows={4} />
          </Form.Item>

          {selectedIGDBGame && (
            <Collapse>
              <Panel header="Oyun Detayları" key="1">
                <Space direction="vertical" style={{ width: '100%' }}>
                  {selectedIGDBGame.summary && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Özet:{' '}
                      </Typography.Text>
                      <Typography.Text>{selectedIGDBGame.summary}</Typography.Text>
                    </div>
                  )}
                  {selectedIGDBGame.release_dates?.[0] && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Çıkış Tarihi:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {new Date(
                          selectedIGDBGame.release_dates[0].date * 1000
                        ).toLocaleDateString()}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedIGDBGame.aggregated_rating && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        IGDB Puanı:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedIGDBGame.aggregated_rating.toFixed(2)}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedIGDBGame.developers && selectedIGDBGame.developers.length > 0 && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Geliştiriciler:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedIGDBGame.developers.map(d => d.name).join(', ')}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedIGDBGame.publishers && selectedIGDBGame.publishers.length > 0 && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Yayıncılar:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedIGDBGame.publishers.map(p => p.name).join(', ')}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedIGDBGame.genres && selectedIGDBGame.genres.length > 0 && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Türler:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedIGDBGame.genres.map(g => g.name).join(', ')}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedIGDBGame.themes && selectedIGDBGame.themes.length > 0 && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Temalar:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedIGDBGame.themes.map(t => t.name).join(', ')}
                      </Typography.Text>
                    </div>
                  )}
                  {selectedIGDBGame.player_perspectives &&
                    selectedIGDBGame.player_perspectives.length > 0 && (
                      <div>
                        <Typography.Text strong style={{ color: '#ff3030' }}>
                          Oyuncu Perspektifleri:{' '}
                        </Typography.Text>
                        <Typography.Text>
                          {selectedIGDBGame.player_perspectives.map(p => p.name).join(', ')}
                        </Typography.Text>
                      </div>
                    )}
                  {selectedIGDBGame.game_modes && selectedIGDBGame.game_modes.length > 0 && (
                    <div>
                      <Typography.Text strong style={{ color: '#ff3030' }}>
                        Oyun Modları:{' '}
                      </Typography.Text>
                      <Typography.Text>
                        {selectedIGDBGame.game_modes.map(m => m.name).join(', ')}
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
