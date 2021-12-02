import {contextPath} from './other'
//系统管理
import SysDicForm from '../pages/SysDic/Form'
import SysDicList from '../pages/SysDic/List'
import SysDeptForm from '../pages/SysDept/Form'
import SysDeptList from '../pages/SysDept/List'

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
  delete: contextPath + '/sysDept/delete'
}
