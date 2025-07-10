'use client';

import { useDeleteGame } from '@/api/queries/useGames';
import useAppStore from '@/store/appStore';
import useGameDetailStore from '@/store/gameDetail';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function DeleteGameModal() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const me = useAppStore(state => state.me);
  const isOpen = useGameDetailStore(state => state.isDeleteModalOpen);
  const onClose = useGameDetailStore(state => state.toggleDeleteModal);
  const selectedGame = useGameDetailStore(state => state.selectedGame);

  const { mutate: deleteGame, isPending: isDeleting } = useDeleteGame();

  function handleDelete() {
    if (!selectedGame?._id) return;

    deleteGame(
      { id: selectedGame._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['userGames'] });
          onClose();

          if (pathname !== '/games/' + me?.id) {
            router.push('/games/' + me?.id);
          }
        },
      }
    );
  }

  return (
    <Modal
      title={t('delete_game')}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={isDeleting}>
          {t('cancel')}
        </Button>,
        <Button key="delete" type="primary" danger onClick={handleDelete} loading={isDeleting}>
          {t('delete')}
        </Button>,
      ]}
    >
      <Typography.Text>
        {t('delete_confirmation', { name: selectedGame?.name || 'asdasd' })}
      </Typography.Text>
    </Modal>
  );
}
