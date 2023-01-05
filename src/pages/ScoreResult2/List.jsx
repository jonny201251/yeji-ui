import { useEffect, useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import {
  get,
  proTableRequest,
  scoreResult2Path,
  sysDeptPath,
  userScorePath,
} from '../../utils';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Space } from 'antd';

export default () => {
  const actionRef = useRef();

  let columns = [
    {
      align: 'center',
      title: '序号',
      valueType: 'index',
    },
    {
      title: '考核年份',
      dataIndex: 'year',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        2021: { text: '2021' },
        2022: { text: '2022' },
      },
      initialValue: '2022',
    },
    {
      align: 'center',
      title: '评分类别',
      dataIndex: 'scoreType',
      valueType: 'text',
      valueEnum: {
        行政评分: { text: '行政评分' },
        党务评分: { text: '党务评分' },
      },
      initialValue: '行政评分',
    },
    {
      align: 'center',
      title: '被评人部门',
      dataIndex: 'depttName',
      valueType: 'text',
      request: () => get(sysDeptPath.getLabelValue2),
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
    },
    {
      align: 'center',
      title: '政治素质',
      dataIndex: 'score0',
      valueType: 'digit',
      search: false,
    },
    {
      align: 'center',
      title: '职业素养',
      dataIndex: 'score1',
      valueType: 'digit',
      search: false,
    },
    {
      align: 'center',
      title: '廉洁从业',
      dataIndex: 'score2',
      valueType: 'digit',
      search: false,
    },
    {
      align: 'center',
      title: '决策能力',
      dataIndex: 'score3',
      valueType: 'digit',
      search: false,
    },
    {
      align: 'center',
      title: '执行能力',
      dataIndex: 'score4',
      valueType: 'digit',
      search: false,
    },
    {
      align: 'center',
      title: '创新能力',
      dataIndex: 'score5',
      valueType: 'digit',
      search: false,
    },
    {
      align: 'center',
      title: '工作业绩',
      dataIndex: 'score6',
      valueType: 'digit',
      search: false,
    },
    {
      align: 'center',
      title: '得分',
      dataIndex: 'totalScore',
      valueType: 'digit',
      search: false,
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      align: 'center',
      title: '是否优秀',
      dataIndex: 'good',
      valueType: 'radio',
      hideInTable: true,
      valueEnum: {
        是: { text: '是' },
        否: { text: '否' },
      },
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
      params={{ listUrl: scoreResult2Path.list }}
      request={proTableRequest}
      //
      options={{ fullScreen: true }}
      //
      search={{ span: 6 }}
      //
      headerTitle={
        <Space>
          {/*<Button type={'primary'} icon={<DownloadOutlined/>}>*/}
          {/*  导出得分情况*/}
          {/*</Button>*/}
          <Button
            type={'primary'}
            icon={<DownloadOutlined />}
            onClick={() => {
              window.location.href = userScorePath.download2;
              return;
            }}
          >
            按照部门导出得分情况
          </Button>
        </Space>
      }
    />
  );
};
