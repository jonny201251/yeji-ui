import { useEffect, useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { get, proTableRequest, userScorePath } from '../../utils';
import ToolBarButton from './ToolBarButton';

export default () => {
  const [dataSource, setDataSource] = useState();
  const [loading, setLoading] = useState(true);
  const actionRef = useRef();

  let columns = [
    {
      title: '评分人姓名',
      dataIndex: 'userName',
      valueType: 'text',
      search: false,
    },
    {
      title: '评分人类型',
      dataIndex: 'checkUserType',
      valueType: 'text',
      search: false,
    },
    {
      title: '评分类别',
      dataIndex: 'scoreType',
      valueType: 'text',
      search: false,
    },
    { title: '被评人姓名', dataIndex: 'userrName', valueType: 'text' },
    {
      title: '被评人类型',
      dataIndex: 'checkkObject',
      valueType: 'text',
      search: false,
    },
    // { title: '党支部', dataIndex: 'partyName', valueType: 'text', search: false },
    {
      title: '被评人类别',
      dataIndex: 'userrType',
      valueType: 'text',
      search: false,
    },
    {
      title: '被评人部门',
      dataIndex: 'depttName',
      valueType: 'text',
      search: false,
    },
    {
      title: '评分状态',
      dataIndex: 'status',
      valueType: 'radio',
      valueEnum: {
        已评分: { text: '已评分', status: 'Success' },
        未评分: { text: '未评分', status: 'Error' },
      },
    },
    {
      title: '得分',
      dataIndex: 'totalScore',
      valueType: 'text',
      search: false,
      sorter: true,
    },
  ];

  useEffect(async () => {
    const data = await get(userScorePath.getScoreList);
    if (data) {
      setDataSource(data);
      setLoading(false);
    }
  }, []);

  return (
    !loading && (
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
        headerTitle={
          <ToolBarButton actionRef={actionRef} record={dataSource} />
        }
      />
    )
  );
};