import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { OperateButton, ToolBarButton } from './index'
import { proTableRequest } from '../utils'

export default (props) => {
  const { columns, path, width, rowKey } = props

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()

  let newColumns = columns.map(item => item)
  newColumns.push(
    {
      title: '操作', valueType: 'option', fixed: 'right',
      render: (text, record, _, action) => [<OperateButton record={record} path={path} actionRef={actionRef}/>]
    }
  )

  return <ProTable
    bordered
    rowKey={rowKey || 'id'}
    actionRef={actionRef}
    columns={newColumns}
    columnEmptyText={true}
    //列表数据
    params={{ listUrl: path.list }}
    request={proTableRequest}
    //复选框
    rowSelection={{}}
    tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
      setSelectedRowKeys(selectedRowKeys)
      return false
    }}
    //
    options={{ fullScreen: false, density: false }}
    headerTitle={
      <ToolBarButton path={path} actionRef={actionRef} selectedRowKeys={selectedRowKeys} width={width}/>
    }
  />
}
