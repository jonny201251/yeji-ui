import { useEffect, useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { get, proTableRequest, search2ScorePath } from '../../utils';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

export default () => {
  let columns = [
    {
      title: '考核年份',
      dataIndex: 'year',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        2021: { text: '2021' },
      },
      initialValue: '2021',
    },
    {
      title: '被评人类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        副总师级: { text: '副总师级' },
        部门正职: { text: '部门正职' },
        部门副职: { text: '部门副职' },
        一般人员: { text: '一般人员' },
        党支部书记: { text: '党支部书记' },
      },
    },
    { title: '姓名', dataIndex: 'name', valueType: 'text' },
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
      params={{ listUrl: search2ScorePath.list }}
      //
      options={{ fullScreen: true }}
      //
      search={{ span: 6 }}
      //
      headerTitle={
        <Button type={'primary'} icon={<DownloadOutlined />}>
          导出得分
        </Button>
      }
    />
  );
};
