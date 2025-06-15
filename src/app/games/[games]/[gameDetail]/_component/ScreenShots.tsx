'use client';
import { useScreenshots } from '@/hooks/useScreenshots';
import { Screenshot } from '@/types/screenshot';
import { EditOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Grid, Image, List, Pagination, Popover, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import AddScreenshotModal from './AddScreenshotModal';
import EditScreenshotModal from './EditScreenshotModal';

export default function Screenshots() {
  const t = useTranslations();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [clickedItemId, setClickedItemId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedSS, setSelectedSS] = useState<Screenshot | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const params = useParams();
  const gameId = params.gameDetail as string;
  const { data } = useScreenshots(gameId);
  const screenshotsPerPage = 10;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  let columns = 5;
  if (screens.xl) {
    columns = 5;
  } else if (screens.lg) {
    columns = 4;
  } else if (screens.md) {
    columns = 3;
  } else if (screens.sm) {
    columns = 2;
  } else {
    columns = 1;
  }

  const handleClosePopover = () => setAnchorEl(null);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleClick = (event: React.MouseEvent<HTMLElement>, item: Screenshot) => {
    setAnchorEl(event.currentTarget);
    setSelectedSS(item);
    setClickedItemId(item._id);
  };
  const handleClickImage = (item: Screenshot) => setSelectedSS(item);
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  const handleEditModalOk = async (values: { name: string; url: string }) => {
    // TODO: API çağrısı yapılacak
    console.log('Form values:', values);
    setIsEditModalOpen(false);
  };
  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
  };
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };
  const handleAddModalOk = async (values: {
    items: { url?: string; file?: File; name?: string }[];
  }) => {
    // TODO: API çağrısı yapılacak
    console.log('Form values:', values);
    setIsAddModalOpen(false);
  };
  const handleAddModalCancel = () => {
    setIsAddModalOpen(false);
  };

  const startIndex = (currentPage - 1) * screenshotsPerPage;
  const currentScreenshots = data?.slice(startIndex, startIndex + screenshotsPerPage);
  if (!data?.length) return null;

  const popoverContent = (
    <div>
      <div onClick={handleEditClick}>{t('edit')}</div>
      <div onClick={handleClosePopover}>{t('delete')}</div>
    </div>
  );

  return (
    <Card
      variant="borderless"
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{t('screenshots') + ` (${data.length})`}</span>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
            {t('add_screenshot')}
          </Button>
        </div>
      }
    >
      <List
        grid={{ gutter: 16, column: columns }}
        style={{ padding: 0 }}
        dataSource={currentScreenshots}
        renderItem={(item: Screenshot) => (
          <List.Item>
            <div
              style={{
                position: 'relative',
                border: '1px solid #f0f0f0',
                borderRadius: 4,
                overflow: 'hidden',
              }}
              onMouseEnter={() => setHoveredItemId(item._id)}
              onMouseLeave={() => {
                if (clickedItemId !== item._id) setHoveredItemId(null);
              }}
            >
              <Image
                src={item.url}
                alt={item.name}
                onClick={() => handleClickImage(item)}
                style={{
                  width: '100%',
                  height: 140,
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  setSelectedSS(item);
                  handleEditClick();
                }}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: hoveredItemId === item._id ? 'block' : 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
              />
              <Popover
                content={popoverContent}
                trigger="click"
                visible={!!anchorEl && clickedItemId === item._id}
                onVisibleChange={visible => {
                  if (!visible) {
                    handleClosePopover();
                    setClickedItemId(null);
                  }
                }}
                placement="right"
              >
                <Button
                  type="text"
                  icon={<EllipsisOutlined />}
                  onClick={event => handleClick(event, item)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 40,
                    display:
                      hoveredItemId === item._id || clickedItemId === item._id ? 'block' : 'none',
                  }}
                />
              </Popover>
              {item.name && (
                <div style={{ padding: '8px' }}>
                  <Typography.Text>{item.name}</Typography.Text>
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
      <Pagination
        total={data.length}
        current={currentPage}
        pageSize={screenshotsPerPage}
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: 'center' }}
      />
      <EditScreenshotModal
        isOpen={isEditModalOpen}
        screenshot={selectedSS}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      />
      <AddScreenshotModal
        isOpen={isAddModalOpen}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
      />
    </Card>
  );
}
