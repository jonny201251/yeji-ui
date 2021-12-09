import { Form, FormItem, FormLayout, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect, useState } from 'react'
import { get, sysDeptPath } from '../../utils'
import { Checkbox, Col, Row } from 'antd'

export default (props) => {
  let { form, record } = props
  const [treeDept, setTreeDept] = useState()
  const [scoreDeptId, setScoreDeptId] = useState()

  const MyCheckBox = (props) => {
    return <Checkbox.Group {...props} style={{ width: '100%' }}>
      <Row>
        {
          scoreDeptId && treeDept.map(item => {
            if (item.key !== scoreDeptId) {
              return <Col span={6}>
                <Checkbox value={item.value}>{item.title}</Checkbox>
              </Col>
            }
          })
        }
      </Row>
    </Checkbox.Group>
  }

  const SchemaField = createSchemaField({
    components: { FormLayout, FormItem, TreeSelect, MyCheckBox }
  })

  useEffect(async () => {
    const data = await get(sysDeptPath.getTreeSelect2)
    if (data) {
      setTreeDept(data)
      form.query('scoreDeptId').take().dataSource = data
    }
    if (record) {
      setScoreDeptId(record.scoreDeptId)
      form.setValues(record)
    }
  }, [])
  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 4, wrapperCol: 20 }}>
        <SchemaField.String
          name="scoreDeptId" required title="评分部门" x-decorator="FormItem"
          x-component="TreeSelect"
          x-component-props={{
            style: { width: 315 },
            onSelect: (value, node, extra) => setScoreDeptId(value)
          }}
        />
        <SchemaField.String
          name="scoreeDeptIdList" required title="被评分部门" x-decorator="FormItem" x-component="MyCheckBox"
        />
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

