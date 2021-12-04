import {contextPath} from './other'
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
import CheckSetForm from '../pages/CheckSet/Form'
import CheckSetList from '../pages/CheckSet/List'
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
  delete: contextPath + '/sysDic/delete'
}
export const sysDeptPath = {
  flag: 'sysDeptPath',
  Form: SysDeptForm, List: SysDeptList,
  list: contextPath + '/sysDept/list',
  get: contextPath + '/sysDept/get',
  add: contextPath + '/sysDept/add',
  edit: contextPath + '/sysDept/edit',
  delete: contextPath + '/sysDept/delete',
  getTreeSelect: contextPath + '/sysDept/getTreeSelect'
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

export const checkSetPath = {
  flag: 'checkSetPath',
  Form: CheckSetForm, List: CheckSetList,
  list: contextPath + '/checkSet/list',
  get: contextPath + '/checkSet/get',
  add: contextPath + '/checkSet/add',
  edit: contextPath + '/checkSet/edit',
  delete: contextPath + '/checkSet/delete'
}
