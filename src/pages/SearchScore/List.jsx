import { useEffect, useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { get, proTableRequest, searchScorePath } from '../../utils';

export default () => {
  let columns = [
    {
      title: '考核名称',
      dataIndex: 'name',
      valueType: 'select',
      hideInTable: true,
    },
    { title: '姓名', dataIndex: 'name', valueType: 'text', search: false },
    {
      title: '政治素质',
      dataIndex: 'checkUserType',
      valueType: 'text',
      search: false,
    },
    {
      title: '职业素养',
      dataIndex: 'scoreType',
      valueType: 'text',
      search: false,
    },
    {
      title: '廉洁从业',
      dataIndex: 'userrName',
      valueType: 'text',
      search: false,
    },
    {
      title: '决策能力',
      dataIndex: 'checkkObject',
      valueType: 'text',
      search: false,
    },
    {
      title: '执行能力',
      dataIndex: 'userrType',
      valueType: 'text',
      search: false,
    },
    {
      title: '创新能力',
      dataIndex: 'depttName',
      valueType: 'text',
      search: false,
    },
    {
      title: '工作业绩',
      dataIndex: 'status',
      valueType: 'text',
      search: false,
    },
    {
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
      columns={columns}
      columnEmptyText={true}
      //列表数据
      params={{ listUrl: searchScorePath.list }}
      //
      options={{ fullScreen: true }}
    />
  );
};
