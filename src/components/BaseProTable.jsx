import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { OperateButton, ToolBarButton } from './index'
import { proTableRequest } from '../utils'

export default (props) => {
  const { path, width } = props

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()
  const columns = [
    { ...props.columns },
    {
      title: '操作', valueType: 'option', fixed: 'right',
      render: (text, record, _, action) => [<OperateButton record={record} path={path} actionRef={actionRef}/>]
    }
  ]

  return <ProTable
    bordered
    rowKey='id'
    actionRef={actionRef}
    columns={columns}
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
    options={{ fullScreen: true, density: false }}
    headerTitle={
      <ToolBarButton path={path} actionRef={actionRef} selectedRowKeys={selectedRowKeys} width={width}/>
    }
  />
}
