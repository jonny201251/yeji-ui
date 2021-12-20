import { BaseProTable } from '../../components';
import {
  checkUserPath,
  get,
  partyPath,
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
    const typeArr = await get(sysDicPath.getLabelValue, { flag: '人员类型' });
    const partyRoleArr = await get(sysDicPath.getLabelValue, {
      flag: '党支部角色',
    });
    const partyArr = await get(partyPath.getLabelValue);
    if (deptArr && roleArr && typeArr && partyRoleArr && partyArr) {
      let deptValueEnum = {};
      deptArr.forEach((item) => (deptValueEnum[item.value] = item.label));
      let roleValueEnum = {};
      roleArr.forEach((item) => (roleValueEnum[item.label] = item.label));
      let typeValueEnum = {};
      typeArr.forEach((item) => (typeValueEnum[item.label] = item.label));
      let partyRoleValueEnum = {};
      partyRoleArr.forEach(
        (item) => (partyRoleValueEnum[item.label] = item.label),
      );
      let partyValueEnum = {};
      partyArr.forEach((item) => (partyValueEnum[item.label] = item.label));

      let tmp = [
        { title: '姓名', dataIndex: 'name', valueType: 'text' },
        {
          title: '性别',
          dataIndex: 'gender',
          valueType: 'radio',
          search: false,
        },
        {
          title: '所在部门',
          dataIndex: 'deptId',
          valueType: 'select',
          valueEnum: deptValueEnum,
          hideInTable: true,
        },
        {
          title: '所在部门',
          dataIndex: 'deptName',
          valueType: 'text',
          search: false,
        },
        {
          title: '人员角色',
          dataIndex: 'userRole',
          valueType: 'text',
          valueEnum: roleValueEnum,
        },
        {
          title: '人员类型',
          dataIndex: 'userType',
          valueType: 'text',
          valueEnum: typeValueEnum,
        },
        {
          title: '是否党员',
          dataIndex: 'havePartyMember',
          valueType: 'select',
          valueEnum: { 是: { text: '是' }, 否: { text: '否' } },
        },
        {
          title: '党支部名称',
          dataIndex: 'partyName',
          valueType: 'text',
          valueEnum: partyValueEnum,
        },
        {
          title: '党支部角色',
          dataIndex: 'partyRole',
          valueType: 'select',
          valueEnum: partyRoleValueEnum,
        },
        { title: '班组名称', dataIndex: 'groupName', valueType: 'text' },
        {
          title: '工作状态',
          dataIndex: 'workStatus',
          valueType: 'radio',
          valueEnum: {
            在岗: { text: '在岗' },
            离职: { text: '离职' },
            退休: { text: '退休' },
          },
        },
      ];
      setColumns(tmp);
      setLoading(false);
    }
  }, []);

  return (
    !loading && (
      <BaseProTable
        path={checkUserPath}
        columns={columns}
        search={{ span: 6 }}
        options={true}
      />
    )
  );
};
