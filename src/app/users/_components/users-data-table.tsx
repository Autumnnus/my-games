'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUsers } from '@/api/queries/useUsers';
import { User } from '@/types/users';
import type { GetProp, TableProps } from 'antd';
import { Image, Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

export default function UsersDataTable() {
  const t = useTranslations();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<User> = [
    {
      title: '',
      dataIndex: 'profileImage',
      width: '8%',
      render: photo => (
        <Image
          src={photo || 'https://avatar.iran.liara.run/public/boy'}
          alt="avatar"
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: t('member'),
      dataIndex: 'name',
      ellipsis: true,
      render: (name, record) => <Link href={`/games/${record._id}`}>{name}</Link>,
    },
    {
      title: t('games'),
      dataIndex: 'gameSize',
      ellipsis: true,
    },
    {
      title: t('completed_games'),
      dataIndex: 'completedGameSize',
      ellipsis: true,
    },
    {
      title: t('screenshots'),
      dataIndex: 'screenshotSize',
      ellipsis: true,
    },
  ];

  const { data, isLoading } = useUsers();

  const handleTableChange: TableProps<User>['onChange'] = (pagination, filters, sorter) => {
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
    <Table<User>
      columns={columns}
      rowKey={record => record._id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={isLoading}
      onChange={handleTableChange}
      scroll={{ x: 'max-content' }}
    />
  );
}
