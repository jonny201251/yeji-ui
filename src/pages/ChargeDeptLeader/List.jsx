import { BaseProTable } from '../../components'
import { chargeDeptLeaderPath } from '../../utils'

export default () => {
  let columns = [
    { title: '主管部门领导', dataIndex: 'userName', valueType: 'text' }
  ]


  return <BaseProTable path={chargeDeptLeaderPath} columns={columns} width={820} rowKey={'userName'}/>
}
