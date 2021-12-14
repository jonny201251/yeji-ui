import { ArrayItems, ArrayTable, Form, FormItem, FormLayout, Input, Select } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect, useState } from 'react'
import { get, sysDicPath } from '../../utils'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

export default (props) => {
  let { form, record } = props
  const [arr, setArr] = useState([])

  const SchemaField = createSchemaField({
    components: { FormLayout, FormItem, Input, Select, ArrayItems, ArrayTable }
  })

  useEffect(async () => {
    form.query('oldCheckkObject').take().display = 'hidden'

    const data1 = await get(sysDicPath.getLabelValue, { flag: '考核人员类型' })

    data1 && setArr(data1)

    const data2 = await get(sysDicPath.getLabelValue, { flag: '被考核对象' })
    if (data2) {
      form.query('checkkObject').take().dataSource = data2
    }
  }, [])
  return <ConfigProvider locale={zhCN}>
    <Form form={form}>
      <SchemaField>
        <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 8, wrapperCol: 12 }}>
          <SchemaField.String name="checkkObject" required title="被考核对象" x-decorator="FormItem" x-component="Select"/>
          <SchemaField.String name="oldCheckkObject" required x-decorator="FormItem" x-component="Input"/>
          <SchemaField.Array name="checkList" x-decorator="FormItem" x-component="ArrayTable">
            <SchemaField.Object>
              <SchemaField.Void x-component="ArrayTable.Column">
                <SchemaField.Void x-decorator="FormItem" required x-component="ArrayTable.SortHandle"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '考核人员类型' }}>
                <SchemaField.String
                  name="checkUserType" required x-decorator="FormItem"
                  x-component="Select"
                  x-component-props={{ style: { width: 250 } }}
                  enum={arr}
                />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '权重' }}>
                <SchemaField.Number
                  x-decorator="FormItem" name="weight" required
                  x-component="Input" x-component-props={{ suffix: '%' }}
                />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column">
                <SchemaField.Void x-component="ArrayTable.Remove"/>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void x-component="ArrayTable.Addition" title="添加条目"/>
          </SchemaField.Array>
        </SchemaField.Void>

      </SchemaField>
    </Form>
  </ConfigProvider>
}

