import { BaseProTable } from '../../components'
import { sysRolePath } from '../../utils'

export default () => {
  let columns = [
    { title: '角色名称', dataIndex: 'name', valueType: 'text' },
    { title: '备注', dataIndex: 'remark', valueType: 'text' }
  ]

  return <BaseProTable path={sysRolePath} columns={columns}/>
}
