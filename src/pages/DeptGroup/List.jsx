import { BaseProTable } from '../../components'
import { deptGroupPath } from '../../utils'

export default () => {
  let columns = [
    { title: '班组名称', dataIndex: 'name', valueType: 'text' },
    { title: '所在部门', dataIndex: 'deptId', valueType: 'text' },
    { title: '备注', dataIndex: 'remark', valueType: 'text' }
  ]

  return <BaseProTable path={deptGroupPath} columns={columns}/>
}
