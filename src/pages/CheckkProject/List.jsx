import { BaseProTable } from '../../components'
import { checkkProjectPath } from '../../utils'

export default () => {
  let columns = [
    { title: '被考核类别', dataIndex: 'checkkType', valueType: 'text' }
  ]


  return <BaseProTable path={checkkProjectPath} columns={columns} rowKey={'checkkType'}/>
}
