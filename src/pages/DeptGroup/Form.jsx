import { Form, FormItem, FormLayout, Input, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { get, sysDeptPath } from '../../utils'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, TreeSelect }
})

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    form.query('id').take().display = 'hidden'
    if (record) {
      form.setValues(record)
    } else {
    }
    const data = await get(sysDeptPath.getTreeSelect)
    if (data) {
      form.query('deptId').take().dataSource = data
    }
  }, [])

  return <Form form={form} layout="horizontal">
    <SchemaField>
      <SchemaField.Void
        x-component="FormLayout"
        x-component-props={{ labelCol: 6, wrapperCol: 16 }}
      >
        <SchemaField.Number name="id" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="name" required title="班组名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Number name="deptId" required title="所在部门" x-decorator="FormItem"
                            x-component="TreeSelect" x-component-props={{ treeDefaultExpandAll: true }}/>
        <SchemaField.String name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

