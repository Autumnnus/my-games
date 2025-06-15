'use client';
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

interface EditGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game;
  onSuccess: () => void;
}

export default function EditGameModal({ isOpen, onClose, game, onSuccess }: EditGameModalProps) {
  const [form] = Form.useForm();
  const [isIGDBAPIOpen, setIsIGDBAPIOpen] = useState(true);
  const [selectedGameData, setSelectedGameData] = useState<IGDBGameData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<
    { value: string; label: string; data: IGDBGameData }[]
  >([]);

  useEffect(() => {
    if (game) {
      form.setFieldsValue({
        name: game.name,
        photo: game.photo,
        platform: game.platform,
        rating: game.rating,
        status: game.status,
        playTime: game.playTime,
        lastPlay: game.lastPlay ? dayjs(game.lastPlay) : undefined,
        review: game.review,
      });
    }
  }, [game, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // API çağrısı burada yapılacak
      console.log('Form değerleri:', values);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Form doğrulama hatası:', error);
    } finally {
      setLoading(false);
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

  return (
    <Modal
      title="Oyunu Düzenle"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: game?.name,
          photo: game?.photo,
          platform: game?.platform,
          rating: game?.rating,
          status: game?.status,
          playTime: game?.playTime,
          lastPlay: game?.lastPlay ? dayjs(game.lastPlay) : undefined,
          review: game?.review,
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
            <Input
              prefix={
                form.getFieldValue('photo') && (
                  <Avatar src={form.getFieldValue('photo')} size={40} style={{ marginRight: 8 }} />
                )
              }
            />
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
                  <Select.Option value="PC">PC</Select.Option>
                  <Select.Option value="PS5">PS5</Select.Option>
                  <Select.Option value="Xbox">Xbox</Select.Option>
                  <Select.Option value="Nintendo">Nintendo</Select.Option>
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
                  <Select.Option value="playing">Oynuyorum</Select.Option>
                  <Select.Option value="completed">Tamamlandı</Select.Option>
                  <Select.Option value="dropped">Bırakıldı</Select.Option>
                  <Select.Option value="planToPlay">Oynanacak</Select.Option>
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
