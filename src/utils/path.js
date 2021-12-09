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
import DeptScoreRelationForm from '../pages/DeptScoreRelation/Form'
import DeptScoreRelationList from '../pages/DeptScoreRelation/List'
import PartyForm from '../pages/Party/Form'
import PartyList from '../pages/Party/List'
import ChargeDeptLeaderForm from '../pages/ChargeDeptLeader/Form'
import ChargeDeptLeaderList from '../pages/ChargeDeptLeader/List'
import ChargePartyLeaderForm from '../pages/ChargePartyLeader/Form'
import ChargePartyLeaderList from '../pages/ChargePartyLeader/List'

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
export const deptScoreRelationPath = {
  flag: 'deptScoreRelationPath',
  Form: DeptScoreRelationForm, List: DeptScoreRelationList,
  list: contextPath + '/deptScoreRelation/list',
  get: contextPath + '/deptScoreRelation/get',
  add: contextPath + '/deptScoreRelation/add',
  edit: contextPath + '/deptScoreRelation/edit',
  delete: contextPath + '/deptScoreRelation/delete'
}
export const partyPath = {
  flag: 'partyPath',
  Form: PartyForm, List: PartyList,
  list: contextPath + '/party/list',
  get: contextPath + '/party/get',
  add: contextPath + '/party/add',
  edit: contextPath + '/party/edit',
  delete: contextPath + '/party/delete',
  getLabelValue: contextPath + '/party/getLabelValue'
}
export const chargeDeptLeaderPath = {
  flag: 'chargeDeptLeaderPath',
  Form: ChargeDeptLeaderForm, List: ChargeDeptLeaderList,
  list: contextPath + '/chargeDeptLeader/list',
  get: contextPath + '/chargeDeptLeader/get',
  add: contextPath + '/chargeDeptLeader/add',
  edit: contextPath + '/chargeDeptLeader/edit',
  delete: contextPath + '/chargeDeptLeader/delete'
}
export const chargePartyLeaderPath = {
  flag: 'chargePartyLeaderPath',
  Form: ChargePartyLeaderForm, List: ChargePartyLeaderList,
  list: contextPath + '/chargePartyLeader/list',
  get: contextPath + '/chargePartyLeader/get',
  add: contextPath + '/chargePartyLeader/add',
  edit: contextPath + '/chargePartyLeader/edit',
  delete: contextPath + '/chargePartyLeader/delete'
}
