import {
  Form,
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  Radio,
  Select,
  TreeSelect,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import { useEffect } from 'react';
import {
  deptGroupPath,
  get,
  partyPath,
  sysDeptPath,
  sysDicPath,
} from '../../utils';
import { Modal } from 'antd';

export default (props) => {
  let { form, record } = props;

  const SchemaField = createSchemaField({
    components: {
      FormLayout,
      FormItem,
      Input,
      TreeSelect,
      Radio,
      Select,
      NumberPicker,
    },
    scope: {
      async userRoleScope(field) {
        if (field.value) {
          let userTypeField = field.query('userType').take();
          if (userTypeField) {
            if (field.value === '公司领导' || field.value === '安全生产总监') {
              userTypeField.value = '公司领导';
              //
              field
                .query('*(groupId,groupName)')
                .take()
                .setState({ display: 'hidden', value: null });
            } else if (
              field.value === '部门正职领导' ||
              field.value === '部门副职领导' ||
              field.value === '副总师级' ||
              field.value === '财务副总监'
            ) {
              userTypeField.value = '中层领导';
              //
              field
                .query('*(groupId,groupName)')
                .take()
                .setState({ display: 'hidden', value: null });
            } else {
              userTypeField.value = '一般人员';
              //
              if (field.value === '班组长' || field.value === '班组成员') {
                field.query('groupId').take().display = 'visible';
                if (!field.query('deptId').take().value) {
                  Modal.error({
                    content: '因为班组依赖部门，所以先选择部门',
                    okText: '知道了',
                  });
                  return;
                }
                const data = await get(deptGroupPath.getLabelValue, {
                  deptId: field.query('deptId').take().value,
                });
                if (data) {
                  field.query('groupId').take().dataSource = data;
                }
              } else {
                field
                  .query('*(groupId,groupName)')
                  .take()
                  .setState({ display: 'hidden', value: null });
              }
            }
          }
        }
      },
    },
  });

  useEffect(async () => {
    form.query('id').take().display = 'hidden';
    form.query('groupId').take().display = 'none';
    form.query('partyName').take().display = 'none';
    form.query('partyRole').take().display = 'none';
    if (record) {
      if (record.havePartyMember === '是') {
        form.query('partyName').take().display = 'visible';
        form.query('partyRole').take().display = 'visible';
      }
      if (record.groupId) {
        const dataa = await get(deptGroupPath.getLabelValue, {
          deptId: record.deptId,
        });
        if (dataa) {
          form
            .query('groupId')
            .take()
            .setState({ dataSource: dataa, display: 'visible' });
        }
      }
    } else {
      form.query('workStatus').take().value = '在岗';
    }
    //
    const data2 = await get(sysDeptPath.getTreeSelect);
    if (data2) {
      form.query('deptId').take().dataSource = data2;
    }
    const data3 = await get(sysDicPath.getLabelValue, { flag: '人员角色' });
    if (data3) {
      form.query('userRole').take().dataSource = data3;
    }
    const data33 = await get(sysDicPath.getLabelValue, { flag: '人员类型' });
    if (data33) {
      form.query('userType').take().dataSource = data33;
    }
    const data4 = await get(partyPath.getLabelValue, { flag: '党支部名称' });
    if (data4) {
      form.query('partyName').take().dataSource = data4;
    }
    const data5 = await get(sysDicPath.getLabelValue, { flag: '党支部角色' });
    if (data5) {
      form.query('partyRole').take().dataSource = data5;
    }
  }, []);

  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormLayout"
          x-component-props={{ labelCol: 6, wrapperCol: 16 }}
        >
          <SchemaField.Number
            name="id"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="name"
            required
            title="姓名"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="gender"
            required
            title="性别"
            x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              { label: '男', value: '男' },
              { label: '女', value: '女' },
            ]}
          />
          <SchemaField.String
            name="havePartyMember"
            required
            title="是否党员"
            x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              { label: '是', value: '是' },
              { label: '否', value: '否' },
            ]}
            x-reactions={{
              target: '*(partyName,partyRole)',
              fulfill: {
                state: {
                  display: '{{$self.value==="是"?"visible":"none"}}',
                },
              },
            }}
          />
          <SchemaField.String
            name="partyName"
            required
            title="党支部名称"
            x-decorator="FormItem"
            x-component="Select"
          />
          <SchemaField.String
            name="partyRole"
            required
            title="党支部角色"
            x-decorator="FormItem"
            x-component="Select"
          />
          <SchemaField.String
            name="workStatus"
            required
            title="工作状态"
            x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              { label: '在岗', value: '在岗' },
              { label: '离职', value: '离职' },
              { label: '退休', value: '退休' },
            ]}
          />
          <SchemaField.Number
            name="deptId"
            required
            title="所在部门"
            x-decorator="FormItem"
            x-component="TreeSelect"
            x-component-props={{
              treeDefaultExpandAll: true,
              onSelect: (value, node, extra) => {
                if (
                  node.title === '安全生产总监' ||
                  node.title === '副总师级' ||
                  node.title === '财务副总监'
                ) {
                  form.query('userRole').take().value = node.title;
                }
              },
            }}
          />
          <SchemaField.String
            name="userRole"
            required
            title="人员角色"
            x-decorator="FormItem"
            x-component="Select"
            x-reactions="{{userRoleScope}}"
          />
          <SchemaField.String
            name="userType"
            required
            title="人员类型"
            x-decorator="FormItem"
            x-component="Select"
          />
          <SchemaField.String
            name="groupId"
            required
            title="班组名称"
            x-decorator="FormItem"
            x-component="Select"
          />
          <SchemaField.Number
            name="userSort"
            title="人员排序"
            x-decorator="FormItem"
            x-component="NumberPicker"
          />
          <SchemaField.String
            name="remark"
            title="备注"
            x-decorator="FormItem"
            x-component="Input.TextArea"
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  );
};
