import { BaseProTable } from '../../components'
import { leadDeptPath } from '../../utils'

export default () => {
  let columns = [
    { title: '姓名', dataIndex: 'userName', valueType: 'text' },
  ]

  return <BaseProTable path={leadDeptPath} columns={columns}/>
}
