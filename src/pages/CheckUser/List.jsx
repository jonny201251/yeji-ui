import { BaseProTable } from '../../components';
import {
  checkUserPath,
  columnRequest,
  get,
  partyPath,
  sysDeptPath,
  sysDicPath,
  userScorePath,
} from '../../utils';
import { useEffect, useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(true);

  let columns = [
    {
      align: 'center',
      title: '序号',
      valueType: 'index',
      width: 50,
    },
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
      request: () => get(sysDeptPath.getLabelValue),
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
      request: () => get(sysDicPath.getLabelValue, { flag: '人员角色' }),
    },
    {
      title: '人员类型',
      dataIndex: 'userType',
      valueType: 'text',
      request: () => get(sysDicPath.getLabelValue, { flag: '人员类型' }),
    },
    {
      title: '是否党员',
      dataIndex: 'havePartyMember',
      valueType: 'radio',
      valueEnum: { 是: { text: '是' }, 否: { text: '否' } },
    },
    {
      title: '党支部名称',
      dataIndex: 'partyName',
      valueType: 'text',
      request: () => get(partyPath.getLabelValue),
    },
    {
      title: '党支部角色',
      dataIndex: 'partyRole',
      valueType: 'select',
      request: () => get(sysDicPath.getLabelValue, { flag: '党支部角色' }),
    },
    { title: '班组名称', dataIndex: 'groupName', valueType: 'text' },
  ];

  return (
    <BaseProTable
      path={checkUserPath}
      columns={columns}
      search={{ span: 6 }}
      options={true}
    />
  );
};
