import {
  ArrayItems,
  ArrayTable,
  Form,
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  PreviewText,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox as Checkboxx,
  ConfigProvider,
  Select as Selectt,
  Space,
} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { get, scorePath } from '../../utils';

export default (props) => {
  let { form, record } = props;
  const [data, setData] = useState([]);
  const [options, setOptions] = useState();
  const [flag, setFlag] = useState(false);

  const SchemaField = createSchemaField({
    components: {
      FormLayout,
      FormItem,
      Input,
      ArrayItems,
      ArrayTable,
      NumberPicker,
      PreviewText,
    },
  });

  const title = () => {
    return (
      <Space>
        <Checkboxx.Group
          options={[
            { label: '政治素质', value: '政治素质' },
            { label: '职业素养', value: '职业素养' },
            { label: '廉洁从业', value: '廉洁从业' },
          ]}
          onChange={(values) => console.log(values)}
        />
        <Input />
        <Button>评分</Button>
      </Space>
    );
  };

  useEffect(async () => {
    form.setInitialValues({ scoreList: record });
    setOptions([
      { label: '政治素质', value: '政治素质' },
      { label: '职业素养', value: '职业素养' },
      { label: '廉洁从业', value: '廉洁从业' },
    ]);
    setFlag(true);
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form}>
        <SchemaField>
          <SchemaField.Array
            name="scoreList"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              pagination: { pageSize: 100 },
              sticky: true,
              title: title,
              border: false,
            }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '评分人姓名' }}
              >
                <SchemaField.String
                  name="userName"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                  // x-component-props={{ style: { width: 250 } }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '评分人类型' }}
              >
                <SchemaField.String
                  name="checkUserType"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                  // x-component-props={{ style: { width: 250 } }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '被评人姓名' }}
              >
                <SchemaField.String
                  name="userrName"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                  // x-component-props={{ style: { width: 250 } }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '被评人类型' }}
              >
                <SchemaField.String
                  name="checkkObject"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                  // x-component-props={{ style: { width: 250 } }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '政治素质' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score1"
                  required
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '职业素养' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score2"
                  required
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '廉洁从业' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score3"
                  required
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '执行能力' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score4"
                  required
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '创新能力' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score5"
                  required
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '工作业绩' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score6"
                  required
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '决策能力' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score7"
                  required
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '总得分' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="totalScore"
                  required
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
            </SchemaField.Object>
          </SchemaField.Array>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
