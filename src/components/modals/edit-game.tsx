"use client";
import usePlatforms from "@/hooks/usePlatforms";
import useGameDetailStore from "@/store/gameDetail";
import { Platform, Status } from "@/types/games";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function EditGameModal() {
  const t = useTranslations();
  const [form] = Form.useForm();
  const isEditGameModalOpen = useGameDetailStore(
    (state) => state.isEditGameModalOpen
  );
  const toggleEditGameModal = useGameDetailStore(
    (state) => state.toggleEditGameModal
  );
  const platforms = usePlatforms();
  const [isIGDBAPIOpen, setIsIGDBAPIOpen] = useState(true);
  const [nameOptions, setNameOptions] = useState([]);

  const loading = false;
  const gameName = "Game Name";
  const gameNameLabel = ["Örnek Oyun", "Diğer Oyun"];
  const randomNumber = 0;

  const photo = Form.useWatch(["photo"], form);

  const handleClose = () => {
    toggleEditGameModal();
    form.resetFields();
  };

  const handleFinish = (values) => {
    console.log("Form values:", values);
    handleClose();
  };
  console.log("platforms", platforms);

  return (
    <Modal
      title={<Typography.Title level={3}>{t("edit_game")}</Typography.Title>}
      open={!!isEditGameModalOpen}
      onCancel={handleClose}
      footer={null}
      width={600}
      style={{ borderRadius: "12px", overflow: "hidden", padding: "20px" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          name: gameName,
          photo: "",
          playTime: "",
          platform: Platform.Steam,
          rating: "",
          status: Status.Completed,
          lastPlay: null,
          review: "",
        }}
      >
        <Form.Item
          label={
            <Flex gap={10} align="center" justify="space-between">
              {t("game_name")}
              <Typography.Text type="secondary">
                {t("use_igdb_api")}
              </Typography.Text>
              <Switch checked={isIGDBAPIOpen} onChange={setIsIGDBAPIOpen} />
            </Flex>
          }
          name="name"
          rules={[{ required: true, message: t("game_name_required") }]}
        >
          {isIGDBAPIOpen ? (
            <Select
              showSearch
              placeholder={t("game_name")}
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
            placeholder="https://game-cover.jpg"
            disabled={loading}
            addonBefore={
              photo && (
                <Image
                  sizes={"40"}
                  src={photo}
                  alt="Photo"
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              )
            }
          />
        </Form.Item>

        <Flex gap={20}>
          <Form.Item
            label={t("game_play_time")}
            name="playTime"
            style={{ flex: 1 }}
          >
            <Input type="number" placeholder="23.5" disabled={loading} />
          </Form.Item>

          <Form.Item label={t("platform")} name="platform" style={{ flex: 1 }}>
            <Select
              placeholder={t("platform")}
              disabled={loading}
              options={
                platforms.map((platform) => ({
                  label: t(platform.label),
                  value: platform.value,
                })) || []
              }
              // optionRender={(platform) => {
              //   return (
              //     <Flex gap={10} align="center">
              //       <Image
              //         src={platform.icon}
              //         alt={platform.label}
              //         style={{ width: 20, height: 20 }}
              //       />
              //       <Typography.Text>{platform.label}</Typography.Text>
              //     </Flex>
              //   );
              // }}
            />
          </Form.Item>
        </Flex>

        <Flex gap={20}>
          <Form.Item label={t("rating")} name="rating" style={{ flex: 1 }}>
            <Input type="number" placeholder="8.6" disabled={loading} />
          </Form.Item>

          <Form.Item label={t("game_status")} name="status" style={{ flex: 1 }}>
            <Select
              placeholder={t("game_status")}
              disabled={loading}
              options={
                Object.values(Status).map((status) => ({
                  label: t(status),
                  value: status,
                })) || []
              }
              // options={statusSelectOptions}
            />
          </Form.Item>
        </Flex>
        <Form.Item label={t("last_play_date")} name="lastPlay">
          <DatePicker style={{ width: "100%" }} disabled={loading} />
        </Form.Item>

        <Form.Item label={t("game_review")} name="review">
          <Input.TextArea
            rows={4}
            placeholder={t("game_review")}
            disabled={loading}
          />
        </Form.Item>

        <Space style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleClose}>{t("cancel")}</Button>
          <Button type="primary" htmlType="submit">
            {t("save")}
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}
