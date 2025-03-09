"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserGames } from "@/hooks/useGames";
import useAppStore from "@/store/appStore";
import { GamesData } from "@/types/games";
import type { GetProp, TableProps } from "antd";
import { Image, Table } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

export default function GamesDataTable({ id }: { id: string }) {
  const locale = useAppStore((state) => state.locale);
  const t = useTranslations();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const pathname = usePathname();
  console.log("pathname", `${pathname}/aaa`);

  const columns: ColumnsType<GamesData> = [
    {
      title: "",
      dataIndex: "photo",
      width: "8%",
      render: (photo) => (
        <Image src={photo} alt="avatar" style={{ width: 50 }} />
      ),
    },
    {
      title: t("name"),
      dataIndex: "name",
      sorter: true,
      width: "30%",
      ellipsis: true,
      render: (name, record) => (
        <Link href={`${pathname}/${record._id}`}>{name}</Link>
      ),
    },
    {
      title: t("rating"),
      dataIndex: "rating",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      ellipsis: true,
      render: (rating) => rating || t("not_rated"),
    },
    {
      title: t("platform"),
      dataIndex: "platform",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      ellipsis: true,
      render: (platform) => t(platform),
    },
    {
      title: t("screenshots"),
      dataIndex: "screenshotSize",
      ellipsis: true,
    },
    {
      title: t("playTime"),
      dataIndex: "playTime",
      ellipsis: true,
    },
    {
      title: t("lastPlay"),
      dataIndex: "lastPlay",
      ellipsis: true,
      render: (lastPlay) =>
        new Date(lastPlay).toLocaleDateString(
          locale === "tr" ? "tr-TR" : "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      ellipsis: true,
      render: (status) => t(status),
    },
  ];

  const { data, isFetching } = useUserGames(id);

  const handleTableChange: TableProps<GamesData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      //   setData([]);
    }
  };

  return (
    <Table<GamesData>
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={isFetching ? [] : data}
      pagination={tableParams.pagination}
      loading={isFetching}
      onChange={handleTableChange}
      scroll={{ x: "max-content" }}
    />
  );
}
