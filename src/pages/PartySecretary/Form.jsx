import { Form, FormItem, FormLayout, Input, Radio } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { useEffect } from 'react'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Radio, Input }
})

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    form.query('id').take().display = 'hidden'
    if (record) {
      form.setValues(record)
    }
  }, [])

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.Number name="id" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="userName" required title="姓名" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String
          name="type" required title="类别" x-decorator="FormItem" x-component="Radio.Group"
          enum={[
            { label: '党委书记', value: '党委书记' },
            { label: '党委副书记', value: '党委副书记' }
          ]}
        />
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

