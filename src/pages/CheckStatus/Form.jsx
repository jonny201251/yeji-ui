import { DatePicker, Form, FormItem, FormLayout, Input, Radio } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import moment from 'moment'
import { dateFormat } from '../../utils'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, Radio, DatePicker }
})

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    form.query('id').take().display = 'hidden'
    if (record) {
      form.setValues(record)
      //
      form.query('year').take().pattern = 'readPretty'
      form.query('startDate').take().pattern = 'readPretty'
    } else {
      let year = form.query('year').take()
      year.initialValue = new Date().getFullYear()
      year.pattern = 'readPretty'
      //
      form.query('name').take().initialValue = new Date().getFullYear() + '业绩考核'
      form.query('status').take().initialValue = '启动'
      //
      let startDate = form.query('startDate').take()
      startDate.initialValue = moment().format(dateFormat)
      startDate.pattern = 'readPretty'
    }
  }, [])

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.Number name="id" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="year" title="考核年份" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="name" required title="考核名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String
          name="status" required title="考核状态" x-decorator="FormItem" x-component="Radio.Group"
          enum={[
            { label: '启动', value: '启动' },
            { label: '停止', value: '停止' }
          ]}
        />
        <SchemaField.Date name="startDate" title="启动时间" x-decorator="FormItem" x-component="DatePicker"/>
        <SchemaField.String name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

