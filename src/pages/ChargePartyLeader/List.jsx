import { BaseProTable } from '../../components'
import { chargePartyLeaderPath } from '../../utils'

export default () => {
  let columns = [
    { title: '公司领导', dataIndex: 'userName', valueType: 'text' }
  ]


  return <BaseProTable path={chargePartyLeaderPath} columns={columns} width={800} rowKey={'userName'}/>
}
