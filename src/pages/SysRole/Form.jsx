import { Form, FormItem, FormLayout, Input } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { useEffect } from 'react'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input }
})

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    form.query('id').take().display = 'hidden'
    if (record) {
      form.setValues(record)
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
        <SchemaField.String name="name" required title="角色名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="remark" required title="备注" x-decorator="FormItem" x-component="Input.TextArea"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

