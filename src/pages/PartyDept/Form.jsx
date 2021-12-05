import { ArrayItems, Form, FormItem, FormLayout, Input, Select, Space, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { get, sysDeptPath } from '../../utils'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, TreeSelect, ArrayItems, Space, Select, Input },
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
    if (record) {
      form.setValues(record)
    }
  }, [])

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.String name="partyName" required title="党支部" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Array name="deptIdList" title="部门名称" x-decorator="FormItem" x-component="ArrayItems">
          <SchemaField.Void x-component="Space">
            <SchemaField.Number
              name="deptId" required x-decorator="FormItem" x-component="TreeSelect"
              x-component-props={{ style: { width: 315 }, treeDefaultExpandAll: true }}
              x-reactions="{{deptIdScope}}"
            />
            <SchemaField.Void x-decorator="FormItem" x-component="ArrayItems.Remove"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayItems.Addition" title="添加部门"/>
        </SchemaField.Array>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

