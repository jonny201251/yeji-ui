import { BaseProTable } from '../../components'
import { checkUserPath, deptGroupPath, get, sysDeptPath } from '../../utils'
import { useEffect, useState } from 'react'

export default () => {
  const [loading, setLoading] = useState(true)
  const [columns, setColumns] = useState([])

  useEffect(async () => {
    const idNameMap1 = await get(sysDeptPath.getIdNameMap)
    const idNameMap2 = await get(deptGroupPath.getIdNameMap)
    if (idNameMap1 && idNameMap2) {
      let tmp = [
        { title: '姓名', dataIndex: 'name', valueType: 'text' },
        { title: '性别', dataIndex: 'gender', valueType: 'text' },
        {
          title: '所在部门', dataIndex: 'deptId', valueType: 'text',
          render: (text, record) => idNameMap1[record.deptId]
        },
        { title: '人员角色', dataIndex: 'userRole', valueType: 'text' },
        { title: '人员类型', dataIndex: 'userType', valueType: 'text' },
        { title: '是否党员', dataIndex: 'havePartyMember', valueType: 'text' },
        { title: '党支部名称', dataIndex: 'partyName', valueType: 'text' },
        { title: '党支部角色', dataIndex: 'partyRole', valueType: 'text' },
        {
          title: '班组名称', dataIndex: 'groupId', valueType: 'text',
          render: (text, record) => idNameMap2[record.groupId]
        },
        { title: '工作状态', dataIndex: 'workStatus', valueType: 'text' }
      ]
      setColumns(tmp)
      setLoading(false)
    }
  }, [])

  return !loading && <BaseProTable path={checkUserPath} columns={columns}/>
}
