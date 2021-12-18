import { BaseProTable } from '../../components'
import { partyPath } from '../../utils'

export default () => {
  let columns = [
    { title: '党支部名称', dataIndex: 'partyName', valueType: 'text' },
    { title: '排序', dataIndex: 'sort', valueType: 'text' }
  ]


  return <BaseProTable path={partyPath} columns={columns} width={820} rowKey={'partyName'}/>
}
