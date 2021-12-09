import { Form, FormItem, FormLayout, Input } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect, useState } from 'react'
import { get, sysDeptPath } from '../../utils'
import { Checkbox, Col, Row } from 'antd'

export default (props) => {
  let { form, record } = props
  const [treeDept, setTreeDept] = useState()

  const MyCheckBox = (props) => {
    return <Checkbox.Group {...props} style={{ width: '100%' }}>
      <Row>
        {
          treeDept && treeDept.map(item => {
            return <Col span={6}>
              <Checkbox value={item.value}>{item.title}</Checkbox>
            </Col>
          })
        }
      </Row>
    </Checkbox.Group>
  }

  const SchemaField = createSchemaField({
    components: { FormLayout, FormItem, Input, MyCheckBox }
  })

  useEffect(async () => {
    const data = await get(sysDeptPath.getTreeSelect2)
    if (data) {
      setTreeDept(data)
    }
    if (record) {
      form.setValues(record)
    }
  }, [])
  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 4, wrapperCol: 20 }}>
        <SchemaField.String
          name="partyName" required title="党支部名称" x-decorator="FormItem" x-component="Input"
          x-component-props={{ style: { width: 315 } }}
        />
        <SchemaField.String name="deptIdList" required title="选择部门" x-decorator="FormItem" x-component="MyCheckBox"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

