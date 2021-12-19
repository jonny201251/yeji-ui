import {
  Checkbox,
  Form,
  FormItem,
  FormLayout,
  TreeSelect,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect, useState } from 'react';
import { get, sysDeptPath } from '../../utils';
import { Checkbox as Checkboxx, Col, Row } from 'antd';

export default (props) => {
  let { form, record } = props;
  const [treeDept, setTreeDept] = useState();
  const [scoreDeptId, setScoreDeptId] = useState();

  const MyCheckBox = (props) => {
    return (
      <Checkboxx.Group {...props} style={{ width: '100%' }}>
        <Row>
          {scoreDeptId &&
            treeDept.map((item) => {
              if (item.key !== scoreDeptId) {
                return (
                  <Col span={6}>
                    <Checkboxx value={item.value}>{item.title}</Checkboxx>
                  </Col>
                );
              }
            })}
        </Row>
      </Checkboxx.Group>
    );
  };

  const SchemaField = createSchemaField({
    components: { FormLayout, FormItem, TreeSelect, MyCheckBox, Checkbox },
  });

  useEffect(async () => {
    const data = await get(sysDeptPath.getTreeSelect2);
    if (data) {
      setTreeDept(data);
      form.query('scoreDeptId').take().dataSource = data;
    }
    if (record) {
      setScoreDeptId(record.scoreDeptId);
      form.setValues(record);
    }
  }, []);

  const onChange = async (values) => {
    if (form.query('scoreDeptId').take().value) {
      if (values.length === 0) {
        form.query('scoreeDeptIdList').take().value = [];
      } else {
        const data = await get(sysDeptPath.getTreeSelect2);
        if (data) {
          let arr = [];
          data.forEach((item) => {
            if (item.value !== form.query('scoreDeptId').take().value) {
              arr.push(item.value);
            }
          });
          form.query('scoreeDeptIdList').take().value = arr;
        }
      }
    }
  };

  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormLayout"
          x-component-props={{ labelCol: 4, wrapperCol: 20 }}
        >
          <SchemaField.String
            name="scoreDeptId"
            required
            title="评分部门"
            x-decorator="FormItem"
            x-component="TreeSelect"
            x-component-props={{
              style: { width: 315 },
              onSelect: (value, node, extra) => setScoreDeptId(value),
            }}
          />
          <SchemaField.String
            name="scoreeDeptIdList"
            required
            title="被评分部门"
            x-decorator="FormItem"
            x-component="MyCheckBox"
          />
          <SchemaField.String
            name="haveSelectAll"
            title="是否全选"
            enum={[{ value: 1 }]}
            x-decorator="FormItem"
            x-component="Checkbox.Group"
            x-component-props={{ onChange: onChange }}
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  );
};
