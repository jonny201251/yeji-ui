import { BaseProTable } from '../../components'
import { checkStatusPath } from '../../utils'

export default () => {
  let columns = [
    { title: '考核年份', dataIndex: 'year', valueType: 'text' },
    { title: '考核名称', dataIndex: 'name', valueType: 'text' },
    {
      title: '考核状态', dataIndex: 'status', valueType: 'text',
      valueEnum: {
        启动: { text: '启动', status: 'Success' },
        停止: { text: '停止', status: 'Error' }
      }
    },
    { title: '启动时间', dataIndex: 'startDate', valueType: 'date' },
    { title: '停止时间', dataIndex: 'endDate', valueType: 'date' }
  ]

  return <BaseProTable path={checkStatusPath} columns={columns}/>
}
