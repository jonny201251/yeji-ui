import { Form, FormItem, FormLayout, Input, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { useEffect } from 'react'
import { get, sysDeptPath } from '../../utils'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, TreeSelect }
})

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    form.query('id').take().display = 'hidden'
    const data = await get(sysDeptPath.getTreeSelect)
    if (data) {
      form.query('pid').take().dataSource = data
    }
    if (record) {
      form.setValues(record)
    }
  }, [])

  return <Form form={form} layout="horizontal">
    <SchemaField>
      <SchemaField.Void
        x-component="FormLayout"
        x-component-props={{ labelCol: 6, wrapperCol: 16 }}
      >
        <SchemaField.Number name="id" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Number name="pid" required title="上级部门" x-decorator="FormItem"
                            x-component="TreeSelect" x-component-props={{ treeDefaultExpandAll: true }}/>
        <SchemaField.String name="name" required title="部门名称" x-decorator="FormItem" x-component="Input"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

