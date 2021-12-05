import { BaseProTable } from '../../components'
import { partyLeadPath } from '../../utils'

export default () => {
  let columns = [
    { title: '姓名', dataIndex: 'userName', valueType: 'text' },
  ]

  return <BaseProTable path={partyLeadPath} columns={columns}/>
}
