import { BaseProTable } from '../../components'
import { partySecretaryPath } from '../../utils'

export default () => {
  let columns = [
    { title: '姓名', dataIndex: 'userName', valueType: 'text' },
    { title: '类别', dataIndex: 'type', valueType: 'text' }
  ]

  return <BaseProTable path={partySecretaryPath} columns={columns}/>
}
