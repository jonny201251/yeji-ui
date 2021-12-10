import { BaseProTable } from '../../components'
import { checkkObjectPath } from '../../utils'

export default () => {
  let columns = [
    { title: '被考核对象', dataIndex: 'checkkObject', valueType: 'text' }
  ]


  return <BaseProTable path={checkkObjectPath} columns={columns} rowKey={'checkkObject'}/>
}
