import {FormItem, FormLayout, Input, Submit, Form, FormButtonGroup, Reset} from "@formily/antd";
import React from "react";
import {createSchemaField} from "@formily/react";
import {Button,Divider} from 'antd'
import {useModel} from "umi"

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})


export default (props) => {
  const {form} = props

  const {a, setA} = useModel('useUser')

  return <FormLayout labelCol={6} wrapperCol={10}>
    <Form
      form={form}
      layout="horizontal"
    >
      <SchemaField>
        <SchemaField.String
          name="aaa"
          required
          title="输入框1-啊啊"
          x-decorator="FormItem"
          x-decorator-props={{
            asterisk: false,
          }}
          x-component="Input"
        />
        <SchemaField.String
          name="bbb"
          required
          title="输入框2--啊啊啊啊"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaField.String
          name="ccc"
          required
          title="输入框3-啊"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaField.String
          name="ddd"
          required
          title="输入框4--啊啊啊啊"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaField.String
          name="ddd5"
          required
          title="输入框5-啊啊"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaField.String
          name="ddd6"
          required
          title="输入框6-啊啊啊啊啊啊啊啊啊"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaField.String
          name="ddd7"
          required
          title="输入框7"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaField>
{/*      <Button onClick={() => {
        form.validate()
        setA('A')
      }
      }>setA</Button>
      <Submit block size="large">
        登录
      </Submit>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
        <Reset>重置</Reset>
        <Button>aaaa</Button>
      </FormButtonGroup.FormItem>*/}
    </Form>
  </FormLayout>
}

