import { BaseProTable } from '../../components';
import {
  get,
  partyPath,
  scorePath,
  sysDeptPath,
  sysDicPath,
} from '../../utils';
import { useEffect, useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([]);

  useEffect(async () => {
    const deptArr = await get(sysDeptPath.getLabelValue);
    const roleArr = await get(sysDicPath.getLabelValue, { flag: '人员角色' });
    const checkkObjectArr = await get(sysDicPath.getLabelValue, {
      flag: '被考核对象',
    });
    const typeArr = await get(sysDicPath.getLabelValue, {
      flag: '考核人员类型',
    });
    const partyArr = await get(partyPath.getLabelValue);
    if (deptArr && roleArr && checkkObjectArr && typeArr && partyArr) {
      let deptEnum = {};
      deptArr.forEach((item) => (deptEnum[item.value] = item.label));
      let roleEnum = {};
      roleArr.forEach((item) => (roleEnum[item.label] = item.label));
      let checkkObjectEnum = {};
      checkkObjectArr.forEach(
        (item) => (checkkObjectEnum[item.label] = item.label),
      );
      let typeEnum = {};
      typeArr.forEach((item) => (typeEnum[item.label] = item.label));
      let partyValueEnum = {};
      partyArr.forEach((item) => (partyValueEnum[item.label] = item.label));

      let tmp = [
        {
          title: '被评人部门',
          dataIndex: 'depttId',
          valueType: 'select',
          valueEnum: deptEnum,
          hideInTable: true,
        },
        {
          title: '被评人部门',
          dataIndex: 'depttName',
          valueType: 'text',
          search: false,
        },
        {
          title: '被评人类型',
          dataIndex: 'checkkObject',
          valueType: 'select',
          valueEnum: checkkObjectEnum,
        },
        { title: '被评人姓名', dataIndex: 'userrName', valueType: 'text' },
        {
          title: '评分类别',
          dataIndex: 'scoreType',
          valueType: 'select',
          valueEnum: { 部门: { text: '部门' }, 党支部: { text: '党支部' } },
        },
        {
          title: '评分人部门',
          dataIndex: 'deptId',
          valueType: 'select',
          valueEnum: deptEnum,
          hideInTable: true,
        },
        {
          title: '评分人部门',
          dataIndex: 'deptName',
          valueType: 'text',
          search: false,
        },
        {
          title: '评分人类型',
          dataIndex: 'checkUserType',
          valueType: 'select',
          valueEnum: typeEnum,
        },
        {
          title: '评分人角色',
          dataIndex: 'userRole',
          valueType: 'text',
          valueEnum: roleEnum,
        },
        { title: '评分人姓名', dataIndex: 'userName', valueType: 'text' },
        {
          title: '评分状态',
          dataIndex: 'status',
          valueType: 'radio',
          valueEnum: { 已评分: { text: '已评分' }, 未评分: { text: '未评分' } },
        },
      ];
      setColumns(tmp);
      setLoading(false);
    }
  }, []);

  return (
    !loading && (
      <BaseProTable
        path={scorePath}
        columns={columns}
        search={{ span: 6 }}
        options={true}
      />
    )
  );
};
