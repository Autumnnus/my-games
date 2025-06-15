'use client';
import { Modal, Typography } from 'antd';
import { useState } from 'react';

interface DeleteGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
  onConfirm: () => void;
}

export default function DeleteGameModal({
  isOpen,
  onClose,
  gameName,
  onConfirm,
}: DeleteGameModalProps) {
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Silme işlemi başarısız:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Oyunu Sil"
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      okText="Evet, Sil"
      cancelText="İptal"
      okButtonProps={{ danger: true, loading: loading }}
    >
      <Typography.Paragraph>
        <strong>{gameName}</strong> oyununu silmek istediğinizden emin misiniz?
      </Typography.Paragraph>
      <Typography.Text type="danger">Bu işlem geri alınamaz!</Typography.Text>
    </Modal>
  );
}
