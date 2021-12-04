import { Form, FormItem, FormLayout, Input, NumberPicker, Radio, Select, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { useEffect } from 'react'
import { deptGroupPath, get, sysDeptPath, sysDicPath } from '../../utils'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, TreeSelect, Radio, Select, NumberPicker }
})

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    form.query('id').take().display = 'hidden'
    if (record) {
      form.setValues(record)
    } else {
      form.query('workStatus').take().initialValue = '在岗'
    }
    //
    const data = await get(sysDicPath.getLabelValue, { flag: '人员类型' })
    if (data) {
      form.query('userType').take().dataSource = data
    }
    const data2 = await get(sysDeptPath.getTreeSelect)
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
    const data6 = await get(deptGroupPath.getLabelValue, { deptId: 3 })
    if (data6) {
      form.query('groupId').take().dataSource = data6
    }

  }, [])

  return <Form form={form} layout="horizontal">
    <SchemaField>
      <SchemaField.Void
        x-component="FormLayout"
        x-component-props={{
          labelCol: 6,
          wrapperCol: 16
        }}
      >
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
        />
        <SchemaField.String
          name="workStatus" required title="工作状态" x-decorator="FormItem" x-component="Radio.Group"
          enum={[
            { label: '在岗', value: '在岗' },
            { label: '离职', value: '离职' }
          ]}
        />
        <SchemaField.String name="userType" required title="人员类型" x-decorator="FormItem" x-component="Select"/>
        <SchemaField.Number name="deptId" required title="所在部门" x-decorator="FormItem"
                            x-component="TreeSelect" x-component-props={{ treeDefaultExpandAll: true }}/>
        <SchemaField.String name="userRole" required title="人员角色" x-decorator="FormItem" x-component="Select"/>
        <SchemaField.String name="groupId" required title="班组名称" x-decorator="FormItem" x-component="Select"/>
        <SchemaField.String name="partyName" required title="党支部名称" x-decorator="FormItem" x-component="Select"/>
        <SchemaField.String name="partyRole" required title="党支部角色" x-decorator="FormItem" x-component="Select"/>
        <SchemaField.String name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

