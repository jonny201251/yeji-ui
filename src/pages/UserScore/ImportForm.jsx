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
      action={contextPath + '/uploadFile2'}
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button icon={<UploadOutlined />}>模板文件</Button>
    </Upload>
  );
};

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, NormalUpload },
});

export default (props) => {
  let { form } = props;

  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormLayout"
          x-component-props={{ labelCol: 6, wrapperCol: 16 }}
        >
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
