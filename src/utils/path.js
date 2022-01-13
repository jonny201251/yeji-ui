import { contextPath } from './other';
//系统管理
import SysDicForm from '../pages/SysDic/Form';
import SysDicList from '../pages/SysDic/List';
import SysDeptForm from '../pages/SysDept/Form';
import SysDeptList from '../pages/SysDept/List';
import SysRoleForm from '../pages/SysRole/Form';
import SysRoleList from '../pages/SysRole/List';
import SysPermissionForm from '../pages/SysPermission/Form';
import SysPermissionList from '../pages/SysPermission/List';
//基础信息设置
import CheckStatusForm from '../pages/CheckStatus/Form';
import CheckStatusList from '../pages/CheckStatus/List';
import CheckUserForm from '../pages/CheckUser/Form';
import CheckUserList from '../pages/CheckUser/List';
import DeptGroupForm from '../pages/DeptGroup/Form';
import DeptGroupList from '../pages/DeptGroup/List';
import DeptScoreRelationForm from '../pages/DeptScoreRelation/Form';
import DeptScoreRelationList from '../pages/DeptScoreRelation/List';
import PartyForm from '../pages/Party/Form';
import PartyList from '../pages/Party/List';
import ChargeDeptLeaderForm from '../pages/ChargeDeptLeader/Form';
import ChargeDeptLeaderList from '../pages/ChargeDeptLeader/List';
import CheckkObjectForm from '../pages/CheckkObject/Form';
import CheckkObjectList from '../pages/CheckkObject/List';
import CheckkProjectForm from '../pages/CheckkProject/Form';
import CheckkProjectList from '../pages/CheckkProject/List';
import PartySecretaryForm from '../pages/PartySecretary/Form';
import PartySecretaryList from '../pages/PartySecretary/List';
import ScoreForm from '../pages/Score/Form';
import ScoreList from '../pages/Score/List';
import UserScoreForm from '../pages/UserScore/Form';
import UserScoreList from '../pages/UserScore/List';
import SearchScoreList from '../pages/SearchScore/List';
import Search2ScoreList from '../pages/Search2Score/List';
import UploadForm from '../pages/Upload/Form';
import UploadList from '../pages/Upload/List';

//flag、导出名称、sysPermission.path,三个地方必须一致
//系统管理
export const sysDicPath = {
  flag: 'sysDicPath',
  Form: SysDicForm,
  List: SysDicList,
  list: contextPath + '/sysDic/list',
  get: contextPath + '/sysDic/get',
  add: contextPath + '/sysDic/add',
  edit: contextPath + '/sysDic/edit',
  delete: contextPath + '/sysDic/delete',
  getLabelValue: contextPath + '/sysDic/getLabelValue',
};
export const sysDeptPath = {
  flag: 'sysDeptPath',
  Form: SysDeptForm,
  List: SysDeptList,
  list: contextPath + '/sysDept/list',
  get: contextPath + '/sysDept/get',
  add: contextPath + '/sysDept/add',
  edit: contextPath + '/sysDept/edit',
  delete: contextPath + '/sysDept/delete',
  getTreeSelect: contextPath + '/sysDept/getTreeSelect',
  getTreeSelect2: contextPath + '/sysDept/getTreeSelect2',
  getIdNameMap: contextPath + '/sysDept/getIdNameMap',
  getLabelValue: contextPath + '/sysDept/getLabelValue',
};
export const sysRolePath = {
  flag: 'sysRolePath',
  Form: SysRoleForm,
  List: SysRoleList,
  list: contextPath + '/sysRole/list',
  get: contextPath + '/sysRole/get',
  add: contextPath + '/sysRole/add',
  edit: contextPath + '/sysRole/edit',
  delete: contextPath + '/sysRole/delete',
};
export const sysPermissionPath = {
  flag: 'sysPermissionPath',
  Form: SysPermissionForm,
  List: SysPermissionList,
  list: contextPath + '/sysPermission/list',
  get: contextPath + '/sysPermission/get',
  add: contextPath + '/sysPermission/add',
  edit: contextPath + '/sysPermission/edit',
  delete: contextPath + '/sysPermission/delete',
  getTreeSelect: contextPath + '/sysPermission/getTreeSelect',
};
//基础信息设置
export const checkStatusPath = {
  flag: 'checkStatusPath',
  Form: CheckStatusForm,
  List: CheckStatusList,
  list: contextPath + '/checkStatus/list',
  get: contextPath + '/checkStatus/get',
  add: contextPath + '/checkStatus/add',
  edit: contextPath + '/checkStatus/edit',
  delete: contextPath + '/checkStatus/delete',
};
export const checkUserPath = {
  flag: 'checkUserPath',
  Form: CheckUserForm,
  List: CheckUserList,
  list: contextPath + '/checkUser/list',
  get: contextPath + '/checkUser/get',
  add: contextPath + '/checkUser/add',
  edit: contextPath + '/checkUser/edit',
  delete: contextPath + '/checkUser/delete',
  getChargeDeptLeader: contextPath + '/checkUser/getChargeDeptLeader',
  changePassword: contextPath + '/checkUser/changePassword',
  initPassword: contextPath + '/checkUser/initPassword',
  login: contextPath + '/checkUser/login',
  logout: contextPath + '/checkUser/logout',
  haveLogin: contextPath + '/checkUser/haveLogin',
};
export const deptGroupPath = {
  flag: 'deptGroupPath',
  Form: DeptGroupForm,
  List: DeptGroupList,
  list: contextPath + '/deptGroup/list',
  get: contextPath + '/deptGroup/get',
  add: contextPath + '/deptGroup/add',
  edit: contextPath + '/deptGroup/edit',
  delete: contextPath + '/deptGroup/delete',
  getLabelValue: contextPath + '/deptGroup/getLabelValue',
  getIdNameMap: contextPath + '/deptGroup/getIdNameMap',
};
export const deptScoreRelationPath = {
  flag: 'deptScoreRelationPath',
  Form: DeptScoreRelationForm,
  List: DeptScoreRelationList,
  list: contextPath + '/deptScoreRelation/list',
  get: contextPath + '/deptScoreRelation/get',
  add: contextPath + '/deptScoreRelation/add',
  edit: contextPath + '/deptScoreRelation/edit',
  delete: contextPath + '/deptScoreRelation/delete',
};
export const partyPath = {
  flag: 'partyPath',
  Form: PartyForm,
  List: PartyList,
  list: contextPath + '/party/list',
  get: contextPath + '/party/get',
  add: contextPath + '/party/add',
  edit: contextPath + '/party/edit',
  delete: contextPath + '/party/delete',
  getLabelValue: contextPath + '/party/getLabelValue',
};
export const chargeDeptLeaderPath = {
  flag: 'chargeDeptLeaderPath',
  Form: ChargeDeptLeaderForm,
  List: ChargeDeptLeaderList,
  list: contextPath + '/chargeDeptLeader/list',
  get: contextPath + '/chargeDeptLeader/get',
  add: contextPath + '/chargeDeptLeader/add',
  edit: contextPath + '/chargeDeptLeader/edit',
  delete: contextPath + '/chargeDeptLeader/delete',
};
export const checkkObjectPath = {
  flag: 'checkkObjectPath',
  Form: CheckkObjectForm,
  List: CheckkObjectList,
  list: contextPath + '/checkkObject/list',
  get: contextPath + '/checkkObject/get',
  add: contextPath + '/checkkObject/add',
  edit: contextPath + '/checkkObject/edit',
  delete: contextPath + '/checkkObject/delete',
  copy: contextPath + '/checkkObject/copy',
};
export const checkkProjectPath = {
  flag: 'checkkProjectPath',
  Form: CheckkProjectForm,
  List: CheckkProjectList,
  list: contextPath + '/checkkProject/list',
  get: contextPath + '/checkkProject/get',
  add: contextPath + '/checkkProject/add',
  edit: contextPath + '/checkkProject/edit',
  delete: contextPath + '/checkkProject/delete',
  copy: contextPath + '/checkkProject/copy',
};
export const partySecretaryPath = {
  flag: 'partySecretaryPath',
  Form: PartySecretaryForm,
  List: PartySecretaryList,
  list: contextPath + '/partySecretary/list',
  get: contextPath + '/partySecretary/get',
  add: contextPath + '/partySecretary/add',
  edit: contextPath + '/partySecretary/edit',
  delete: contextPath + '/partySecretary/delete',
};
export const scorePath = {
  flag: 'scorePath',
  Form: ScoreForm,
  List: ScoreList,
  list: contextPath + '/score/list',
  get: contextPath + '/score/get',
  add: contextPath + '/score/add',
  edit: contextPath + '/score/edit',
  delete: contextPath + '/score/delete',
  getScoreList: contextPath + '/score/getScoreList',
};
export const userScorePath = {
  flag: 'userScorePath',
  Form: UserScoreForm,
  List: UserScoreList,
  list: contextPath + '/userScore/list',
  edit: contextPath + '/userScore/edit',
  getScoreList: contextPath + '/userScore/getScoreList',
  edit2: contextPath + '/userScore/edit2',
  getScoreList2: contextPath + '/userScore/getScoreList2',
  getCheckkObject: contextPath + '/userScore/getCheckkObject',
  getCheckkObjectAll: contextPath + '/userScore/getCheckkObjectAll',
};
export const searchScorePath = {
  flag: 'searchScorePath',
  List: SearchScoreList,
};
export const search2ScorePath = {
  flag: 'search2ScorePath',
  List: Search2ScoreList,
};
export const uploadPath = {
  flag: 'uploadPath',
  List: UploadList,
  Form: UploadForm,
  list: contextPath + '/upload/list',
  get: contextPath + '/upload/get',
  add: contextPath + '/upload/add',
  edit: contextPath + '/upload/edit',
  delete: contextPath + '/upload/delete',
};
