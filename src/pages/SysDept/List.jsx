import { BaseProTable } from '../../components'
import { sysDeptPath } from '../../utils'

export default () => {
  let columns = [
    { title: '部门名称', dataIndex: 'name', valueType: 'text' }
  ]

  return <BaseProTable path={sysDeptPath} columns={columns}/>
}
