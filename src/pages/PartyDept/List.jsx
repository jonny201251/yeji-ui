import { BaseProTable } from '../../components'
import { partyDeptPath } from '../../utils'

export default () => {
  let columns = [
    { title: '党支部', dataIndex: 'partyName', valueType: 'text' }
  ]

  return <BaseProTable path={partyDeptPath} columns={columns}/>
}
