import { BaseProTable } from '../../components'
import { chargeDeptLeaderPath } from '../../utils'

export default () => {
  let columns = [
    { title: '公司领导', dataIndex: 'userName', valueType: 'text' }
  ]


  return <BaseProTable path={chargeDeptLeaderPath} columns={columns} width={800} rowKey={'userName'}/>
}
