import { DatePicker, Form, FormItem, FormLayout, Input, Radio, Select } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { checkUserPath, get } from '../../utils'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, Radio, DatePicker, Select }
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
      form.query('name').take().dataSource = data
    }

  }, [])

  return <Form form={form} layout="horizontal">
    <SchemaField>
      <SchemaField.Void
        x-component="FormLayout"
        x-component-props={{ labelCol: 6, wrapperCol: 16 }}
      >
        <SchemaField.Number name="id" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="name" title="公司领导姓名" x-decorator="FormItem" x-component="Select"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

