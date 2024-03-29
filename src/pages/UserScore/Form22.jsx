import {
  ArrayTable,
  Form,
  FormItem,
  FormLayout,
  PreviewText,
  Space,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, message, Modal } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { NumberPicker } from '../../components';

const projectArr = [
  '政治素质',
  '职业素养',
  '廉洁从业',
  '决策能力',
  '执行能力',
  '创新能力',
  '工作业绩',
];
const weightArr = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4];
const weightTextArr = ['10%', '10%', '10%', '10%', '10%', '10%', '40%'];

export default (props) => {
  let { form, record } = props;
  const [score, setScore] = useState(0);
  const SchemaField = createSchemaField({
    components: {
      FormLayout,
      FormItem,
      ArrayTable,
      NumberPicker,
      PreviewText,
      Space,
    },
  });

  useEffect(() => {
    let arr = [];
    for (let i = 0; i <= 6; i++) {
      if (record.status === '已评分') {
        arr.push({
          project: projectArr[i],
          score: record['score' + i],
          weight: weightTextArr[i],
        });
      } else {
        arr.push({ project: projectArr[i], weight: weightTextArr[i] });
      }
    }
    if (record.status === '已评分') {
      setScore(record.totalScore);
    }
    form.setValues({ userrName: record.userrName, arr: arr });
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form}>
        <Space style={{ marginBottom: 22 }}>
          <b>{'姓名:'}</b>
          {record.userrName}
          <Button
            onClick={() => {
              if (record.diskName) {
                window.location.href = record.diskName;
                return;
              } else {
                message.error('还没有上传述职材料');
              }
            }}
            type={'link'}
          >
            述职材料
          </Button>
          <b>{'评分状态:'}</b>
          {record.status}
          <b>{'得分:'}</b>
          {score}
          <Button
            onClick={async () => {
              const values = await form.submit();
              if (values) {
                let totalScore = 0;
                for (let i = 0; i <= 6; i++) {
                  totalScore += values.arr[i]['score'] * weightArr[i];
                }
                setScore(totalScore);
              }
            }}
            type={'primary'}
          >
            计算得分
          </Button>
        </Space>
        <SchemaField>
          <SchemaField.Array
            name="arr"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              sticky: true,
            }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '考核项目' }}
              >
                <SchemaField.String
                  name="project"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '分值' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score"
                  required
                  minimum={50}
                  maximum={100}
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '权重' }}
              >
                <SchemaField.String
                  name="weight"
                  x-decorator="FormItem"
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
