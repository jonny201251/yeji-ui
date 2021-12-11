import { BaseProTable } from '../../components'
import { checkkProjectPath } from '../../utils'

export default () => {
  let columns = [
    { title: '被考核对象', dataIndex: 'checkkObject', valueType: 'text' }
  ]


  return <BaseProTable path={checkkProjectPath} columns={columns} rowKey={'checkkObject'}/>
}
