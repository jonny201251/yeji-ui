import { Form, FormItem, FormLayout, Input, NumberPicker, Radio, Select, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { useEffect } from 'react'
import { deptGroupPath, get, sysDeptPath, sysDicPath } from '../../utils'
import { Modal } from 'antd'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, TreeSelect, Radio, Select, NumberPicker },
  scope: {
    async userRoleScope(field) {
      if (field.value) {
        let userTypeField = field.query('userType').take()
        if (field.value === '公司领导') {
          userTypeField.value = '公司领导'
          //
          field.query('groupId').take().display = 'none'
        } else if (field.value === '部门正职领导' || field.value === '部门副职领导') {
          userTypeField.value = '中层领导'
          //
          field.query('groupId').take().display = 'none'
        } else {
          userTypeField.value = '一般人员'
          //
          if (field.value === '班组长' || field.value === '班组成员') {
            field.query('groupId').take().display = 'visible'
            if (!field.query('deptId').take().value) {
              Modal.error({ content: '因为班组依赖部门，所以先选择部门', okText: '知道了' })
              return
            }
            const data = await get(deptGroupPath.getLabelValue, { deptId: field.query('deptId').take().value })
            if (data) {
              field.query('groupId').take().dataSource = data
            }
          } else {
            field.query('groupId').take().display = 'none'
          }
        }
      }
    },
    havePartyMemberScope(field) {
      if (field.value) {
        if (field.value === '是') {
          field.query('partyName').take().display = 'visible'
          field.query('partyRole').take().display = 'visible'
        } else {
          field.query('partyName').take().display = 'none'
          field.query('partyRole').take().display = 'none'
        }
      }
    }
  }
})

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    form.query('id').take().display = 'hidden'
    form.query('userType').take().pattern = 'disabled'
    form.query('groupId').take().display = 'none'
    form.query('partyName').take().display = 'none'
    form.query('partyRole').take().display = 'none'
    if (record) {
      form.setValues(record)
    } else {
      form.query('workStatus').take().initialValue = '在岗'
    }
    //
    const data2 = await get(sysDeptPath.getTreeSelect2)
    if (data2) {
      form.query('deptId').take().dataSource = data2
    }
    const data3 = await get(sysDicPath.getLabelValue, { flag: '人员角色' })
    if (data3) {
      form.query('userRole').take().dataSource = data3
    }
    const data4 = await get(sysDicPath.getLabelValue, { flag: '党支部名称' })
    if (data4) {
      form.query('partyName').take().dataSource = data4
    }
    const data5 = await get(sysDicPath.getLabelValue, { flag: '党支部角色' })
    if (data5) {
      form.query('partyRole').take().dataSource = data5
    }
  }, [])

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.Number name="id" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="name" required title="姓名" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String
          name="gender" required title="性别" x-decorator="FormItem" x-component="Radio.Group"
          enum={[
            { label: '男', value: '男' },
            { label: '女', value: '女' }
          ]}
        />
        <SchemaField.String
          name="havePartyMember" required title="是否党员" x-decorator="FormItem" x-component="Radio.Group"
          enum={[
            { label: '是', value: '是' },
            { label: '否', value: '否' }
          ]}
          x-reactions="{{havePartyMemberScope}}"
        />
        <SchemaField.String name="partyName" required title="党支部名称" x-decorator="FormItem" x-component="Select"/>
        <SchemaField.String name="partyRole" required title="党支部角色" x-decorator="FormItem" x-component="Select"/>
        <SchemaField.String
          name="workStatus" required title="工作状态" x-decorator="FormItem" x-component="Radio.Group"
          enum={[
            { label: '在岗', value: '在岗' },
            { label: '离职', value: '离职' }
          ]}
        />
        <SchemaField.String name="userType" required title="人员类型" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Number
          name="deptId" required title="所在部门" x-decorator="FormItem"
          x-component="TreeSelect" x-component-props={{ treeDefaultExpandAll: true }}
        />
        <SchemaField.String
          name="userRole" required title="人员角色" x-decorator="FormItem" x-component="Select"
          x-reactions="{{userRoleScope}}"
        />
        <SchemaField.String name="groupId" required title="班组名称" x-decorator="FormItem" x-component="Select"/>
        <SchemaField.Number name="sort" title="人员排序" x-decorator="FormItem" x-component="NumberPicker"/>
        <SchemaField.String name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

