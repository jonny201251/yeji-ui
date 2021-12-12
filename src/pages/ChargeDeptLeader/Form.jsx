import { Form, FormItem, FormLayout, Select } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect, useState } from 'react'
import { checkUserPath, get, sysDeptPath } from '../../utils'
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
    components: { FormLayout, FormItem, Select, MyCheckBox }
  })

  useEffect(async () => {
    const data = await get(sysDeptPath.getTreeSelect2)
    if (data) {
      setTreeDept(data)
    }
    const data2 = await get(checkUserPath.getChargeDeptLeader)
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
          name="userName" required title="主管部门领导" x-decorator="FormItem" x-component="Select"
          x-component-props={{ style: { width: 315 } }}
        />
        <SchemaField.String name="deptIdList" required title="选择部门" x-decorator="FormItem" x-component="MyCheckBox"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

