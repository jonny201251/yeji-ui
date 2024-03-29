import {
  ArrayItems,
  ArrayTable,
  Checkbox,
  Form,
  FormItem,
  FormLayout,
  Input,
  PreviewText,
  Space,
  Submit,
} from '@formily/antd';
import { createSchemaField, Field } from '@formily/react';
import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { createForm } from '@formily/core';
import { session } from '../../utils';
import { DownloadOutlined } from '@ant-design/icons';
import { NumberPicker } from '../../components';

const scoreForm = createForm();
const checkkObjectForm = createForm();

export default (props) => {
  let { form, record, checkkObject } = props;

  const ArrayTableIndex = (props) => {
    const index = ArrayTable.useIndex();
    return (
      <span {...props} className={'formily-array-base-index'}>
        {index + 1}
      </span>
    );
  };
  const MyButton = (props) => {
    const record = ArrayTable.useRecord();
    if (record.diskName) {
      return (
        <Button
          {...props}
          onClick={() => {
            window.location.href = record.diskName;
            return;
          }}
          type={'text'}
          icon={<DownloadOutlined />}
          style={{ marginLeft: 6 }}
        />
      );
    } else {
      return <></>;
    }
  };
  //筛选出的评分数据
  const [record2, setRecord2] = useState(record);

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
      ArrayTableIndex,
      MyButton,
    },
  });
  const computeScore = () => {
    record2.forEach((item) => {
      let weightArr;
      if (item.userrType === '一般人员') {
        weightArr = [0.1, 0.1, 0.1, 0, 0.15, 0.15, 0.4];
        item['score3'] = 0;
      } else {
        weightArr = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4];
      }
      let totalScore = 0;
      for (let i = 0; i <= 6; i++) {
        if (item['score' + i]) {
          totalScore += (item['score' + i] || 0) * weightArr[i];
        }
      }
      item.totalScore = totalScore;
      item.status = '已评分';
    });
  };

  useEffect(async () => {
    scoreForm.reset();
    checkkObjectForm.reset();
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={checkkObjectForm}>
        <Space align={'start'}>
          <Field
            name="arr"
            validator={[{ required: true, message: '选择类型' }]}
            title={<b>{'筛选类型'}</b>}
            decorator={[FormItem]}
            component={[Checkbox.Group]}
            dataSource={checkkObject}
          />
          <Button
            type={'primary'}
            onClick={async () => {
              const values = await checkkObjectForm.submit();
              if (values) {
                let tmp = [];
                //
                values.arr.forEach((object) => {
                  record.forEach((item) => {
                    if (object === item.checkkObject) {
                      tmp.push(item);
                    }
                  });
                });
                form.setValues({ scoreList: tmp });
                setRecord2(tmp);
              } else {
                form.setValues({ scoreList: record });
                setRecord2(record);
              }
            }}
          >
            筛选
          </Button>
          <Button
            type={'primary'}
            onClick={() => {
              checkkObjectForm.reset();
              form.setValues({ scoreList: record });
              setRecord2(record);
            }}
          >
            重置
          </Button>
        </Space>
      </Form>
      <Form form={scoreForm}>
        <Space align={'start'}>
          <Field
            validator={[{ required: true, message: '选择考核项目' }]}
            name="arr"
            title={<b>{'批量评分'}</b>}
            decorator={[FormItem]}
            component={[Checkbox.Group]}
            dataSource={[
              { label: '政治素质', value: 'score0' },
              { label: '职业素养', value: 'score1' },
              { label: '廉洁从业', value: 'score2' },
              { label: '决策能力', value: 'score3' },
              { label: '执行能力', value: 'score4' },
              { label: '创新能力', value: 'score5' },
              { label: '工作业绩', value: 'score6' },
            ]}
          />
          <Field
            name="score"
            validator={[
              {
                required: true,
                minimum: 50,
                maximum: 100,
                message: '输入分值',
              },
            ]}
            decorator={[FormItem]}
            component={[
              NumberPicker,
              { style: { width: 120 }, placeholder: '分值' },
            ]}
          />
          <Button
            type={'primary'}
            onClick={async () => {
              const values = await scoreForm.submit();
              if (values) {
                //
                let { arr, score } = values;
                arr.forEach((name) => {
                  record2.forEach((item) => {
                    item[name] = score;
                  });
                });
                //
                computeScore();
                form.setValues({ scoreList: record2 });
                // message.success('完成批量评分')
              }
            }}
          >
            批量评分
          </Button>
          <Button
            type={'primary'}
            onClick={() => {
              computeScore();
              form.setValues({ scoreList: record2 });
              // message.success('完成计算得分')
            }}
          >
            计算得分
          </Button>
        </Space>
      </Form>
      <Form form={form}>
        <SchemaField>
          <SchemaField.String
            required
            x-decorator="FormItem"
            title={<b>{'一般人员'}</b>}
            x-component="PreviewText.Input"
            default={
              '政治素质:10%，职业素养:10%，廉洁从业:10%，决策能力:0，执行能力:15%，创新能力:15%，工作业绩:40%'
            }
          />
          <SchemaField.String
            required
            x-decorator="FormItem"
            title={<b>{'其他人员'}</b>}
            x-component="PreviewText.Input"
            default={
              '政治素质:10%，职业素养:10%，廉洁从业:10%，决策能力:10%，执行能力:10%，创新能力:10%，工作业绩:40%'
            }
          />
          <SchemaField.String
            required
            x-decorator="FormItem"
            title={<b>{'优秀比例'}</b>}
            x-component="PreviewText.Input"
            default={
              '三种类型(副总师级+部门正职领导、部门副职领导、一般人员)，如果被评人数5人以上，那么每种类型的优秀率（90分以上为优秀）不能超过20%'
            }
          />
          <SchemaField.Array
            name="scoreList"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              pagination: { pageSize: 200 },
              sticky: true,
              // title: title
            }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 60,
                  title: '序号',
                  align: 'center',
                }}
              >
                <SchemaField.Void
                  x-decorator="FormItem"
                  x-component="ArrayTableIndex"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  title: '被评人类型',
                }}
              >
                <SchemaField.String
                  name="checkkObject"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
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
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '政治素质' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score0"
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
                  name="score1"
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
                  name="score2"
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
                  name="score5"
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
                  name="score6"
                  required
                  minimum={50}
                  maximum={100}
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '得分', width: 50 }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="totalScore"
                  required
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '述职材料', width: 75 }}
              >
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="MyButton" />
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
          </SchemaField.Array>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
