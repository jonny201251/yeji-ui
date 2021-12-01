import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { proTableRequest, sysDicPath } from '../../utils'
import { OperateButton, ToolBarButton } from '../../components'

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()
  const columns = [
    { title: '大类名称', dataIndex: 'flag', valueType: 'text' },
    { title: '小类名称', dataIndex: 'name', valueType: 'text' },
    {
      title: '操作', valueType: 'option', fixed: 'right',
      render: (text, record, _, action) => [<OperateButton record={record} path={sysDicPath} actionRef={actionRef}/>]
    }
  ]

  return <ProTable
    bordered
    rowKey='id'
    actionRef={actionRef}
    columns={columns}
    //列表数据
    params={{ listUrl: sysDicPath.list }}
    request={proTableRequest}
    //复选框
    rowSelection={{}}
    tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
      setSelectedRowKeys(selectedRowKeys)
      return false
    }}
    //
    options={{ fullScreen: true, density: false }}
    headerTitle={
      <ToolBarButton path={sysDicPath} actionRef={actionRef} selectedRowKeys={selectedRowKeys}/>
    }
  />
}
