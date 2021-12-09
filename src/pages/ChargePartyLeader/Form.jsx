import { Form, FormItem, FormLayout, Select } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect, useState } from 'react'
import { get, partyPath,checkUserPath } from '../../utils'
import { Checkbox, Col, Row } from 'antd'

export default (props) => {
  let { form, record } = props
  const [party, setParty] = useState()

  const MyCheckBox = (props) => {
    return <Checkbox.Group {...props} style={{ width: '100%' }}>
      <Row>
        {
          party && party.map(item => {
            return <Col span={6}>
              <Checkbox value={item.value}>{item.label}</Checkbox>
            </Col>
          })
        }
      </Row>
    </Checkbox.Group>
  }

  const SchemaField = createSchemaField({
    components: { FormLayout, FormItem, Select, MyCheckBox }
  })

  useEffect(async () => {
    const data = await get(partyPath.getLabelValue)
    if (data) {
      setParty(data)
    }
    const data2 = await get(checkUserPath.getLeadName)
    if (data2) {
      form.query('userName').take().dataSource = data2
    }
    if (record) {
      form.setValues(record)
    }
  }, [])
  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 4, wrapperCol: 20 }}>
        <SchemaField.String
          name="userName" required title="公司领导" x-decorator="FormItem" x-component="Select"
          x-component-props={{ style: { width: 315 } }}
        />
        <SchemaField.String name="partyNameList" required title="选择党支部" x-decorator="FormItem" x-component="MyCheckBox"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

