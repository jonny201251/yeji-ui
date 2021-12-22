import {
  ArrayItems,
  ArrayTable,
  Checkbox,
  Form,
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  PreviewText,
  Space,
  Submit,
} from '@formily/antd';
import { createSchemaField, Field } from '@formily/react';
import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { get, scorePath } from '../../utils';
import { createForm } from '@formily/core';

const scoreForm = createForm();

export default (props) => {
  let { form, record } = props;
  const [data, setData] = useState([]);
  const [options, setOptions] = useState();
  const [flag, setFlag] = useState(false);
  const [checkedList, setCheckedList] = useState();
  const [inputScore, setInputScore] = useState();

  form.setValues({ scoreList: record });

  const SchemaField = createSchemaField({
    components: {
      FormLayout,
      FormItem,
      Input,
      ArrayItems,
      ArrayTable,
      NumberPicker,
      PreviewText,
      Space,
      Submit,
      Checkbox,
    },
  });

  const title = () => {
    return (
      <Form form={scoreForm}>
        <Space align={'start'}>
          <Field
            required
            name="arr"
            decorator={[FormItem]}
            component={[Checkbox.Group]}
            dataSource={[
              { label: '政治素质', value: 'score1' },
              { label: '职业素养', value: 'score2' },
              { label: '廉洁从业', value: 'score3' },
              { label: '决策能力', value: 'score4' },
              { label: '执行能力', value: 'score5' },
              { label: '创新能力', value: 'score6' },
              { label: '工作业绩', value: 'score7' },
            ]}
          />
          <Field
            name="score"
            validator={[{ required: true, minimum: 50, maximum: 100 }]}
            decorator={[FormItem]}
            component={[
              NumberPicker,
              { style: { width: 120 }, placeholder: '分值' },
            ]}
          />
          <Button
            onClick={async () => {
              const values = await scoreForm.submit();
              if (values) {
                //批量评分
                let { arr, score } = values;
                arr.forEach((name) => {
                  record.forEach((item) => {
                    item[name] = score;
                  });
                });
                //计算得分
                record.forEach((item) => {
                  let totalScore = 0;
                  for (let i = 1; i <= 7; i++) {
                    console.log(item.checkkObject);
                    if (item['score' + i]) {
                      totalScore += item['score' + i];
                    }
                  }
                  item.totalScore = totalScore;
                });
                form.setValues({ scoreList: record });
              }
            }}
          >
            批量评分
          </Button>
          <Button
            onClick={() => {
              record.forEach((item) => {
                let totalScore = 0;
                for (let i = 1; i <= 7; i++) {
                  if (item['score' + i]) {
                    totalScore += item['score' + i];
                  }
                }
                item.totalScore = totalScore;
              });
              form.setValues({ scoreList: record });
            }}
          >
            计算得分
          </Button>
        </Space>
      </Form>
    );
  };

  useEffect(async () => {
    const dataa = await get(scorePath.getScoreList);
    if (dataa) {
      setData(dataa);
    }
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
              pagination: { pageSize: 200 },
              sticky: true,
              title: title,
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
                  minimum={50}
                  maximum={100}
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
                  minimum={50}
                  maximum={100}
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
                  minimum={50}
                  maximum={100}
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '决策能力' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score4"
                  required
                  minimum={50}
                  maximum={100}
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '执行能力' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score5"
                  required
                  minimum={50}
                  maximum={100}
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '创新能力' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score6"
                  required
                  minimum={50}
                  maximum={100}
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '工作业绩' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score7"
                  required
                  minimum={50}
                  maximum={100}
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '得分' }}
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
