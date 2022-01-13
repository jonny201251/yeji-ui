import { useEffect, useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { get, proTableRequest, userScorePath } from '../../utils';
import ToolBarButton from './ToolBarButton';
import OperateButton from './OperateButton';

export default () => {
  const actionRef = useRef();

  let columns = [
    {
      align: 'center',
      title: '序号',
      valueType: 'index',
    },
    {
      align: 'center',
      title: '评分类别',
      dataIndex: 'scoreType',
      valueType: 'text',
      search: false,
    },
    {
      align: 'center',
      title: '被评人类型',
      dataIndex: 'checkkObject',
      valueType: 'text',
      request: () => get(userScorePath.getCheckkObject),
    },
    {
      align: 'center',
      title: '被评人姓名',
      dataIndex: 'userrName',
      valueType: 'text',
      render: (text, record) => {
        return <OperateButton record={record} actionRef={actionRef} />;
      },
    },
    {
      align: 'center',
      title: '被评人部门',
      dataIndex: 'depttName',
      valueType: 'text',
      search: false,
    },
    {
      align: 'center',
      title: '评分状态',
      dataIndex: 'status',
      valueType: 'radio',
      valueEnum: {
        已评分: { text: '已评分', status: 'Success' },
        未评分: { text: '未评分', status: 'Error' },
      },
    },
    {
      align: 'center',
      title: '得分',
      dataIndex: 'totalScore',
      valueType: 'text',
      search: false,
      sorter: true,
    },
  ];

  return (
    <ProTable
      bordered
      rowKey="id"
      actionRef={actionRef}
      columns={columns}
      columnEmptyText={true}
      //列表数据
      pagination={{
        pageSize: 100,
      }}
      params={{ listUrl: userScorePath.list }}
      request={proTableRequest}
      //
      options={{ fullScreen: true }}
      //
      headerTitle={<ToolBarButton actionRef={actionRef} />}
      //
      search={{ span: 6 }}
    />
  );
};
