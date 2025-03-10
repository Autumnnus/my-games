"use client";
import useGameDetailStore from "@/store/gameDetail";
import {
  Avatar,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
const { Panel } = Collapse;

export default function EditGameModal() {
  const t = useTranslations();
  const [form] = Form.useForm();
  const isEditGameModalOpen = useGameDetailStore(
    (state) => state.isEditGameModalOpen
  );
  const toggleEditGameModal = useGameDetailStore(
    (state) => state.toggleEditGameModal
  );
  const [isIGDBAPIOpen, setIsIGDBAPIOpen] = useState(true);
  const [nameOptions, setNameOptions] = useState([]);

  // Varsayılan değerler, loading, imageSrc, platformSelectOptions, statusSelectOptions,
  // selectedGameData, convertUnixTimestamp, TABLE_HEADER_BACKGROUND_COLOR gibi değişkenlerin tanımlandığını varsayın.
  const loading = false;
  const imageSrc = ""; // örnek: "https://..."
  const platformSelectOptions = [
    { value: "pc", label: "PC" },
    { value: "ps5", label: "PS5" },
  ];
  const statusSelectOptions = [
    { value: "released", label: t("released") },
    { value: "beta", label: t("beta") },
  ];
  const selectedGameData = null; // örnek olarak
  const TABLE_HEADER_BACKGROUND_COLOR = "#f0f2f5";
  const gameName = "Game Name";
  const gameNameLabel = ["Örnek Oyun", "Diğer Oyun"];
  const randomNumber = 0;

  // Örnek: istenirse fetchIGDBGames çağırıp nameOptions state'ini güncelleyebilirsiniz.
  const fetchIGDBGames = (searchText: string) => {
    // API çağrısı yapıp sonuçları setNameOptions ile güncelleyin.
    // Örneğin:
    // fetch(`/api/games?search=${searchText}`).then(res => res.json()).then(data => setNameOptions(data));
  };

  const handleClose = () => {
    toggleEditGameModal();
    form.resetFields();
  };

  const handleFinish = (values: any) => {
    // Form verilerini gönderme işlemi: onSubmit(values)
    console.log("Form values:", values);
    handleClose();
  };

  // İsim alanında arama yapıldığında asenkron seçenekleri güncelleyin
  const handleNameSearch = (value: string) => {
    if (isIGDBAPIOpen) {
      fetchIGDBGames(value);
    }
  };

  return (
    <Modal
      title={t("edit_game")}
      open={!!isEditGameModalOpen}
      onCancel={handleClose}
      onOk={() => form.submit()}
      width="large"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          name: gameName,
          photo: "",
          playTime: "",
          platform: "",
          rating: "",
          status: "",
          lastPlay: null,
          review: "",
        }}
      >
        <Form.Item
          label={
            <Space>
              {t("game_name")}
              <Typography.Text type="secondary">
                {t("use_igdb_api")}
              </Typography.Text>
              <Switch checked={isIGDBAPIOpen} onChange={setIsIGDBAPIOpen} />
            </Space>
          }
          name="name"
          rules={[{ required: true, message: t("game_name_required") }]}
        >
          {isIGDBAPIOpen ? (
            <Select
              showSearch
              filterOption={false}
              placeholder={t("game_name")}
              onSearch={handleNameSearch}
              options={nameOptions}
              disabled={loading}
            />
          ) : (
            <Input
              placeholder={gameNameLabel[randomNumber]}
              disabled={loading}
            />
          )}
        </Form.Item>

        <Form.Item label={t("game_photo_url")} name="photo">
          <Input
            placeholder="https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
            disabled={loading}
            addonBefore={imageSrc && <Avatar size={40} src={imageSrc} />}
          />
        </Form.Item>

        <Space direction="horizontal" size="middle">
          <Form.Item
            label={t("game_play_time")}
            name="playTime"
            rules={[{ required: true, message: t("game_play_time_required") }]}
          >
            <Input type="number" placeholder="23.5" disabled={loading} />
          </Form.Item>
          <Form.Item
            label={t("platform")}
            name="platform"
            rules={[{ required: true, message: t("platform_required") }]}
          >
            <Select
              placeholder={t("required_input_placeholder", {
                name: t("platform"),
              })}
              disabled={loading}
            >
              {platformSelectOptions.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Space>

        <Space direction="horizontal" size="middle">
          <Form.Item label={t("rating")} name="rating">
            <Input type="number" placeholder="8.6" disabled={loading} />
          </Form.Item>
          <Form.Item
            label={t("game_status")}
            name="status"
            rules={[{ required: true, message: t("game_status_required") }]}
          >
            <Select
              placeholder={t("required_input_placeholder", {
                name: t("game_status"),
              })}
              disabled={loading}
            >
              {statusSelectOptions.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Space>

        <Form.Item
          label={t("last_play_date")}
          name="lastPlay"
          rules={[{ required: true, message: t("last_play_date_required") }]}
        >
          <DatePicker style={{ width: "100%" }} disabled={loading} />
        </Form.Item>

        <Form.Item label={t("game_review")} name="review">
          <Input.TextArea
            rows={4}
            placeholder={t("optional_input_placeholder", {
              name: t("game_review"),
            })}
            disabled={loading}
          />
        </Form.Item>

        {selectedGameData && (
          <div>
            <Typography.Text
              style={{ textAlign: "center", display: "block" }}
              strong
            >
              {selectedGameData.name} {t("game_details")}
            </Typography.Text>
          </div>
        )}
      </Form>
    </Modal>
  );
}
