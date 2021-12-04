import { BaseProTable } from '../../components'
import { leadDeptPath } from '../../utils'

export default () => {
  let columns = [
    { title: '公司领导姓名', dataIndex: 'userName', valueType: 'text' }
  ]

  return <BaseProTable path={leadDeptPath} columns={columns} rowKey={'userName'}/>
}
