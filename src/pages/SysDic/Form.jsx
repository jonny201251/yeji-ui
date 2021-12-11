import { Form, FormItem, FormLayout, Input } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input }
})

export default (props) => {
  let { form, record } = props

  useEffect(() => {
    form.query('id').take().display = 'hidden'
    if (record) {
      form.setValues(record)
    }
  }, [])

  /*    form.setFieldState('id', (state) => {
        state.display = 'hidden'
      })*/

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.Number name="id" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="flag" required title="大类名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="name" required title="小类名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Number name="sort" x-decorator="FormItem" title="排序" x-component="Input"/>
        <SchemaField.String
          name="remark" title="备注" x-decorator="FormItem"
          x-component="Input.TextArea"
          x-component-props={{ rows: 4 }}
        />
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

