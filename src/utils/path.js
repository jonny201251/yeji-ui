import { contextPath } from './other'
//系统管理
import SysDicForm from '../pages/SysDic/Form'
import SysDicList from '../pages/SysDic/List'
import SysDeptForm from '../pages/SysDept/Form'
import SysDeptList from '../pages/SysDept/List'
import SysRoleForm from '../pages/SysRole/Form'
import SysRoleList from '../pages/SysRole/List'
import SysPermissionForm from '../pages/SysPermission/Form'
import SysPermissionList from '../pages/SysPermission/List'
//基础信息设置
import CheckStatusForm from '../pages/CheckStatus/Form'
import CheckStatusList from '../pages/CheckStatus/List'
import CheckUserForm from '../pages/CheckUser/Form'
import CheckUserList from '../pages/CheckUser/List'
import DeptGroupForm from '../pages/DeptGroup/Form'
import DeptGroupList from '../pages/DeptGroup/List'
import LeadDeptForm from '../pages/LeadDept/Form'
import LeadDeptList from '../pages/LeadDept/List'
import PartyLeadForm from '../pages/PartyLead/Form'
import PartyLeadList from '../pages/PartyLead/List'
import PartyDeptForm from '../pages/PartyDept/Form'
import PartyDeptList from '../pages/PartyDept/List'
//人员评分
//部门评分
//flag、导出名称、sysPermission.path,三个地方必须一致

//系统管理
export const sysDicPath = {
  flag: 'sysDicPath',
  Form: SysDicForm, List: SysDicList,
  list: contextPath + '/sysDic/list',
  get: contextPath + '/sysDic/get',
  add: contextPath + '/sysDic/add',
  edit: contextPath + '/sysDic/edit',
  delete: contextPath + '/sysDic/delete',
  getLabelValue: contextPath + '/sysDic/getLabelValue'
}
export const sysDeptPath = {
  flag: 'sysDeptPath',
  Form: SysDeptForm, List: SysDeptList,
  list: contextPath + '/sysDept/list',
  get: contextPath + '/sysDept/get',
  add: contextPath + '/sysDept/add',
  edit: contextPath + '/sysDept/edit',
  delete: contextPath + '/sysDept/delete',
  getTreeSelect: contextPath + '/sysDept/getTreeSelect',
  getTreeSelect2: contextPath + '/sysDept/getTreeSelect2',
  getIdNameMap: contextPath + '/sysDept/getIdNameMap'
}
export const sysRolePath = {
  flag: 'sysRolePath',
  Form: SysRoleForm, List: SysRoleList,
  list: contextPath + '/sysRole/list',
  get: contextPath + '/sysRole/get',
  add: contextPath + '/sysRole/add',
  edit: contextPath + '/sysRole/edit',
  delete: contextPath + '/sysRole/delete'
}
export const sysPermissionPath = {
  flag: 'sysPermissionPath',
  Form: SysPermissionForm, List: SysPermissionList,
  list: contextPath + '/sysPermission/list',
  get: contextPath + '/sysPermission/get',
  add: contextPath + '/sysPermission/add',
  edit: contextPath + '/sysPermission/edit',
  delete: contextPath + '/sysPermission/delete',
  getTreeSelect: contextPath + '/sysPermission/getTreeSelect'
}
//基础信息设置
export const checkStatusPath = {
  flag: 'checkStatusPath',
  Form: CheckStatusForm, List: CheckStatusList,
  list: contextPath + '/checkStatus/list',
  get: contextPath + '/checkStatus/get',
  add: contextPath + '/checkStatus/add',
  edit: contextPath + '/checkStatus/edit',
  delete: contextPath + '/checkStatus/delete'
}
export const checkUserPath = {
  flag: 'checkUserPath',
  Form: CheckUserForm, List: CheckUserList,
  list: contextPath + '/checkUser/list',
  get: contextPath + '/checkUser/get',
  add: contextPath + '/checkUser/add',
  edit: contextPath + '/checkUser/edit',
  delete: contextPath + '/checkUser/delete',
  getLeadName: contextPath + '/checkUser/getLeadName'
}
export const deptGroupPath = {
  flag: 'deptGroupPath',
  Form: DeptGroupForm, List: DeptGroupList,
  list: contextPath + '/deptGroup/list',
  get: contextPath + '/deptGroup/get',
  add: contextPath + '/deptGroup/add',
  edit: contextPath + '/deptGroup/edit',
  delete: contextPath + '/deptGroup/delete',
  getLabelValue: contextPath + '/deptGroup/getLabelValue',
  getIdNameMap: contextPath + '/deptGroup/getIdNameMap'
}
export const leadDeptPath = {
  flag: 'leadDeptPath',
  Form: LeadDeptForm, List: LeadDeptList,
  list: contextPath + '/leadDept/list',
  get: contextPath + '/leadDept/get',
  add: contextPath + '/leadDept/add',
  edit: contextPath + '/leadDept/edit',
  delete: contextPath + '/leadDept/delete'
}
export const partyLeadPath = {
  flag: 'partyLeadPath',
  Form: PartyLeadForm, List: PartyLeadList,
  list: contextPath + '/partyLead/list',
  get: contextPath + '/partyLead/get',
  add: contextPath + '/partyLead/add',
  edit: contextPath + '/partyLead/edit',
  delete: contextPath + '/partyLead/delete'
}
export const partyDeptPath = {
  flag: 'partyDeptPath',
  Form: PartyDeptForm, List: PartyDeptList,
  list: contextPath + '/partyDept/list',
  get: contextPath + '/partyDept/get',
  add: contextPath + '/partyDept/add',
  edit: contextPath + '/partyDept/edit',
  delete: contextPath + '/partyDept/delete',
  getLabelValue: contextPath + '/partyDept/getLabelValue'
}
