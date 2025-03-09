"use client";

import { Screenshot, ScreenshotType } from "@/types/screenshot";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Image, List, Pagination, Popover, Typography } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const screenshotsPerPage = 10;

export default function Screenshots() {
  const t = useTranslations();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [clickedItemId, setClickedItemId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedSS, setSelectedSS] = useState<Screenshot | null>(null);
  const [isPreviewScreenshotOpen, setIsPreviewScreenshotOpen] =
    useState<() => void | undefined | null>();

  const screenShots: Screenshot[] = [
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
    {
      _id: "1",
      url: "https://images.steamusercontent.com/ugc/51332347453718096/A6648EE3EA01524DE80C936D6915DE8F42480198/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      name: "Screenshot 1",
      createdAt: new Date(),
      game: "1",
      images: [],
      updatedAt: new Date(),
      user: "1",
      key: "1",
      type: ScreenshotType.Image,
    },
  ];

  function handleClosePopover() {
    setAnchorEl(null);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleClick(
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    item: Screenshot
  ) {
    setAnchorEl?.(event.currentTarget);
    setSelectedSS?.(item);
    setClickedItemId(item._id);
  }

  function handleClickImage(item: Screenshot) {
    setSelectedSS?.(item);
  }

  const startIndex = (currentPage - 1) * screenshotsPerPage;
  const currentScreenshots = screenShots.slice(
    startIndex,
    startIndex + screenshotsPerPage
  );

  if (screenShots.length === 0) return null;

  const popoverContent = (
    <div>
      <div
        // style={globalStyles.popoverPrimaryOption}
        onClick={() => {
          //   setIsEditScreenshotDialogOpen?.();
          handleClosePopover?.();
        }}
      >
        {t("edit")}
      </div>
      <div
        // style={globalStyles.popoverErrorOption}
        onClick={() => {
          //   setIsDeleteScreenshotDialogOpen?.();
          handleClosePopover?.();
        }}
      >
        {t("delete")}
      </div>
    </div>
  );

  return (
    <div>
      <Typography.Title level={4}>
        {`${t("screenshots")} (${screenShots.length})`}
      </Typography.Title>
      <List
        grid={{ gutter: 8, column: 5 }}
        dataSource={currentScreenshots}
        renderItem={(item: Screenshot) => (
          <List.Item style={{ padding: 0 }}>
            <div
              style={{
                position: "relative",
                border: "1px solid #e8e8e8",
                borderRadius: "4px",
                overflow: "hidden",
              }}
              onMouseEnter={() => setHoveredItemId(item._id)}
              onMouseLeave={() => {
                if (clickedItemId !== item._id) {
                  setHoveredItemId(null);
                }
              }}
            >
              <Image
                src={item.url}
                alt={item.name}
                onClick={() => handleClickImage(item)}
                style={{
                  objectFit: "fill",
                  position: "relative",
                  width: "100%",
                  cursor: "pointer",
                  height: "100%",
                }}
              />
              <Popover
                content={popoverContent}
                trigger="click"
                visible={!!anchorEl && clickedItemId === item._id}
                onVisibleChange={(visible) => {
                  if (!visible) {
                    handleClosePopover?.();
                    setClickedItemId(null);
                  }
                }}
                placement="right"
              >
                <Button
                  type="text"
                  icon={<EllipsisOutlined />}
                  onClick={(event) => handleClick(event, item)}
                  style={{
                    position: "absolute",
                    top: 3,
                    right: 3,
                    display:
                      hoveredItemId === item._id || clickedItemId === item._id
                        ? "block"
                        : "none",
                  }}
                />
              </Popover>
              {item.name && (
                <div style={{ marginTop: 4 }}>
                  <Typography.Text>{item.name}</Typography.Text>
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
      <Pagination
        total={screenShots.length}
        current={currentPage}
        pageSize={screenshotsPerPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
