import { ArrayItems, Form, FormItem, FormLayout, Select, Space, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { checkUserPath, get, sysDeptPath } from '../../utils'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, TreeSelect, ArrayItems, Space, Select },
  scope: {
    async deptIdScope(field) {
      const data = await get(sysDeptPath.getTreeSelect2)
      if (data) {
        field.dataSource = data
      }
    }
  }
})
export default (props) => {
  let { form, record } = props
  useEffect(async () => {
    form.query('id').take().display = 'hidden'
    if (record) {
      form.setValues(record)
    }

    const data = await get(checkUserPath.getLeadName)
    if (data) {
      form.query('userName').take().dataSource = data
    }
  }, [])
  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.Number name="id" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="userName" required title="公司领导姓名" x-decorator="FormItem" x-component="Select"/>
        <SchemaField.Array name="list" required title="主管部门" x-decorator="FormItem" x-component="ArrayItems">
          <SchemaField.Void x-component="Space">
            <SchemaField.Number
              name="deptId" required x-decorator="FormItem" x-component="TreeSelect"
              x-component-props={{ style: { width: 315 }, treeDefaultExpandAll: true }}
              x-reactions="{{deptIdScope}}"
            />
            <SchemaField.Void x-decorator="FormItem" x-component="ArrayItems.Remove"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayItems.Addition" title="添加条目"/>
        </SchemaField.Array>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

