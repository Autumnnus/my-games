'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserGames } from '@/api/queries/useGames';
import useAppStore from '@/store/appStore';
import useGameDetailStore from '@/store/gameDetail';
import { GamesData } from '@/types/games';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { GetProp, MenuProps, TableProps } from 'antd';
import { Button, Card, Dropdown, Image, Input, Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

export default function GamesDataTable() {
  const locale = useAppStore(state => state.locale);
  const me = useAppStore(state => state.me);
  const toggleAddGameModal = useGameDetailStore(state => state.toggleAddGameModal);
  const toggleEditGameModal = useGameDetailStore(state => state.toggleEditGameModal);
  const setSelectedGame = useGameDetailStore(state => state.setSelectedGame);
  const t = useTranslations();
  const params = useParams();
  const pathname = usePathname();
  const route = useRouter();
  const id = params.games as string;
  const isOwner = useMemo(() => me?.id === id, [me?.id, id]);

  const { data: games, isFetching } = useUserGames(id);
  const [searchText, setSearchText] = useState('');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const filteredGames = useMemo(() => {
    if (!searchText || !games) return games;

    return games.filter(game => game.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, games]);

  const handleDelete = (id: string) => {};

  const handleEdit = (id: string) => {
    toggleEditGameModal();
    const game = games?.find(game => game._id === id);
    setSelectedGame(game || null);
  };

  const handleTableChange: TableProps<GamesData>['onChange'] = (pagination, filters, sorter) => {
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

  const columns: ColumnsType<GamesData> = [
    {
      title: null,
      dataIndex: 'photo',
      width: 80,
      fixed: 'left',
      render: photo => <Image src={photo} alt="avatar" />,
    },
    {
      title: t('name'),
      dataIndex: 'name',
      sorter: true,
      width: 200,
      ellipsis: true,
      fixed: 'left',
      render: (name, record) => <Link href={`${pathname}/${record._id}`}>{name}</Link>,
    },
    {
      title: t('rating'),
      dataIndex: 'rating',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      ellipsis: true,
      render: rating => rating || t('not_rated'),
      width: 180,
    },
    {
      title: t('platform'),
      dataIndex: 'platform',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      ellipsis: true,
      render: platform => t(platform),
      width: 180,
    },
    {
      title: t('screenshots'),
      dataIndex: 'screenshotSize',
      ellipsis: true,
      width: 180,
    },
    {
      title: t('playTime'),
      dataIndex: 'playTime',
      ellipsis: true,
      width: 180,
    },
    {
      title: t('lastPlay'),
      dataIndex: 'lastPlay',
      ellipsis: true,
      render: lastPlay =>
        new Date(lastPlay).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      width: 200,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      ellipsis: true,
      render: status => t(status),
      width: 180,
    },
    ...(isOwner
      ? [
          {
            title: null,
            dataIndex: 'action',
            width: 100,
            render: (_: any, record: GamesData) => {
              const items: MenuProps['items'] = [
                {
                  key: 'view',
                  label: t('view'),
                  onClick: () => route.push(`${pathname}/${record._id}`),
                  icon: <EyeOutlined />,
                },
                {
                  type: 'divider',
                },
                {
                  key: 'edit',
                  label: t('edit'),
                  onClick: () => handleEdit(record._id),
                  icon: <EditOutlined />,
                },
                {
                  key: 'delete',
                  label: t('delete'),
                  onClick: () => handleDelete(record._id),
                  icon: <DeleteOutlined />,
                  danger: true,
                },
              ];

              const handleButtonClick = () => {
                handleEdit(record._id);
              };

              const handleMenuClick: MenuProps['onClick'] = () => {
                handleEdit(record._id);
              };

              const menuProps = {
                items,
                onClick: handleMenuClick,
              };

              return (
                <Dropdown.Button size="small" menu={menuProps} onClick={handleButtonClick}>
                  {t('edit')}
                </Dropdown.Button>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <Card style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input.Search
          placeholder={t('search_games')}
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={toggleAddGameModal} icon={<PlusOutlined />}>
          {t('add_game')}
        </Button>
      </div>
      <Table<GamesData>
        columns={columns}
        dataSource={filteredGames}
        rowKey={record => record._id}
        onChange={handleTableChange}
        loading={isFetching}
        pagination={tableParams.pagination}
        scroll={{
          x: columns.reduce(
            (acc, column) => acc + (typeof column.width === 'number' ? column.width : 0),
            0
          ),
          y: 'calc(100vh - 200px)',
        }}
        locale={{ emptyText: t('no_data') }}
        sticky
      />
    </Card>
  );
}
