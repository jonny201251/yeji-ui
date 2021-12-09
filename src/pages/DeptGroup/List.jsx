import { BaseProTable } from '../../components'
import { deptGroupPath, get, sysDeptPath } from '../../utils'
import { useEffect, useState } from 'react'

export default () => {
  const [loading, setLoading] = useState(true)
  const [columns, setColumns] = useState([])

  useEffect(async () => {
    const idNameMap = await get(sysDeptPath.getIdNameMap)
    if (idNameMap) {
      let tmp = [
        { title: '班组名称', dataIndex: 'name', valueType: 'text' },
        {
          title: '所在部门', dataIndex: '所在部门', valueType: 'text',
          render: (text, record) => idNameMap[record.deptId]
        },
        { title: '备注', dataIndex: 'remark', valueType: 'text' }
      ]
      setColumns(tmp)
      setLoading(false)
    }
  }, [])

  return !loading && <BaseProTable path={deptGroupPath} columns={columns}/>
}
