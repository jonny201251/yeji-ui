import { BaseProTable } from '../../components'
import { partyPath } from '../../utils'

export default () => {
  let columns = [
    { title: '党支部名称', dataIndex: 'partyName', valueType: 'text' }
  ]


  return <BaseProTable path={partyPath} columns={columns} width={800} rowKey={'partyName'}/>
}
