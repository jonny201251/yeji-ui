import {contextPath} from './other'
//系统管理
import SysDicForm from '../pages/SysDic/Form'
import SysDicList from '../pages/SysDic/List'

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
