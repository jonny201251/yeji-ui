import { Form, FormItem, FormLayout, Input, Upload } from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect } from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { contextPath } from '../../utils';

const NormalUpload = (props) => {
  return (
    <Upload
      {...props}
      action={contextPath + '/uploadFile'}
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button icon={<UploadOutlined />}>上传文件</Button>
    </Upload>
  );
};

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, NormalUpload },
});

export default (props) => {
  let { form, record } = props;

  useEffect(async () => {
    if (record) {
      form.setValues(record);
      //
      form.query('year').take().pattern = 'readPretty';
    } else {
      let year = form.query('year').take();
      year.initialValue = '2023';
      year.pattern = 'readPretty';
      //
      form.query('name').take().initialValue = '2023年述职材料';
    }
  }, []);

  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormLayout"
          x-component-props={{ labelCol: 6, wrapperCol: 16 }}
        >
          <SchemaField.String
            name="year"
            required
            title="年份"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="name"
            required
            title="名称"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.Array
            name="uploadList"
            title="上传"
            x-decorator="FormItem"
            x-component="NormalUpload"
            required
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  );
};
