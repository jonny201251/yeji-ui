import { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { proTableRequest, uploadPath } from '../../utils';
import ToolBarButton from './ToolBarButton';
import OperateButton from './OperateButton';

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const actionRef = useRef();

  let columns = [
    { title: '年份', dataIndex: 'year' },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
      render: (text, record) => {
        return <OperateButton record={record} actionRef={actionRef} />;
      },
    },
  ];

  return (
    <ProTable
      bordered
      rowKey="year"
      actionRef={actionRef}
      columns={columns}
      columnEmptyText={true}
      //列表数据
      params={{ listUrl: uploadPath.list }}
      request={proTableRequest}
      //复选框
      rowSelection={{}}
      tableAlertRender={({
        selectedRowKeys,
        selectedRows,
        onCleanSelected,
      }) => {
        setSelectedRowKeys(selectedRowKeys);
        return false;
      }}
      //
      options={false}
      search={false}
      //
      headerTitle={
        <ToolBarButton
          actionRef={actionRef}
          selectedRowKeys={selectedRowKeys}
        />
      }
    />
  );
};
