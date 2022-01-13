import {
  ArrayTable,
  Form,
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  PreviewText,
  Space,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect, useState } from 'react';
import { ConfigProvider, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import zhCN from 'antd/lib/locale/zh_CN';

const projectArr = [
  '政治素质',
  '职业素养',
  '廉洁从业',
  '决策能力',
  '执行能力',
  '创新能力',
  '工作业绩',
];
const weightArr = [0.1, 0.1, 0.1, 0, 0.15, 0.15, 0.4];
const weightTextArr = ['10%', '10%', '10%', '0', '15%', '15%', '40%'];

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
    for (let i = 0; i <= 5; i++) {
      if (i >= 3) {
        if (record.status === '已评分') {
          arr.push({
            project: projectArr[i],
            score: record['score' + (i + 1)],
            weight: weightTextArr[i + 1],
          });
        } else {
          arr.push({ project: projectArr[i], weight: weightTextArr[i + 1] });
        }
      } else {
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
    }
    if (record.status === '已评分') {
      setScore(record.totalScore);
    }
    form.setValues({ userrName: record.userrName, arr: arr });
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form}>
        <Space style={{ marginBottom: 10 }}>
          <b>{'姓名:'}</b>
          {record.userrName}
          <Button
            onClick={() => {
              window.location.href = record.diskName;
              return;
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
                for (let i = 0; i <= 5; i++) {
                  if (i >= 3) {
                    totalScore += values.arr[i]['score'] * weightArr[i + 1];
                  } else {
                    totalScore += values.arr[i]['score'] * weightArr[i];
                  }
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
