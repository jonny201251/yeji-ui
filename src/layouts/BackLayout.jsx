import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Layout, Menu, Tabs } from 'antd'
import {
  CloseOutlined,
  EditOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
import './backLayout.less'
//全局样式
import './global.less'

import _ from 'lodash'
import { useModel } from 'umi'
import * as utils from '../utils'

const { Header, Sider, Content } = Layout

//为了解决关闭tab,setActiveKey没有起作用问题
let flagKey

export default () => {
  const [collapsed, setCollapsed] = useState(false)
  const { tabPanes, setTabPanes, activeKey, setActiveKey } = useModel('useTabPanes')
  const [openKeys, setOpenKeys] = useState([])

  let rootSubmenuKeys = []

  const onClick = ({ key }) => {
    setActiveKey(key)
    if (tabPanes.indexOf(key) >= 0) {
    } else {
      let arr = [...tabPanes]
      arr.push(key)
      setTabPanes(arr)
    }
  }

  const renderMenu = (menuList) => {
    if (utils.env === 'dev') {
      openKeys.push('xxxx')
      return <Menu.SubMenu
        key="xxxx"
        icon={<SettingOutlined/>}
        title='基础信息设置'
        onClick={onClick}
      >
        <Menu.Item key="1-数据字典-sysDicPath">数据字典</Menu.Item>
        <Menu.Item key="2-部门管理-sysDeptPath">部门管理</Menu.Item>
        <Menu.Item key="3-角色管理-sysRolePath">角色管理</Menu.Item>
        <Menu.Item key="4-菜单管理-sysPermissionPath">权限管理</Menu.Item>
        <Menu.Item key="5-用户管理-sysUserPath">用户管理</Menu.Item>
        <Menu.Item key="6-考核启动和停止-checkStatusPath">考核启动和停止</Menu.Item>
        <Menu.Item key="7-考核人员信息-checkUserPath">考核人员信息</Menu.Item>
        <Menu.Item key="8-主管党支部的党委领导-sysUserPath">主管党支部的党委领导</Menu.Item>
        <Menu.Item key="9-公司领导主管部门-sysUserPath">公司领导主管部门</Menu.Item>
        <Menu.Item key="10-被考核的人员角色-sysUserPath">被考核的人员角色</Menu.Item>
        <Menu.Item key="11-部门间的评分方向-sysUserPath">部门间的评分方向</Menu.Item>
        <Menu.Item key="12-被考核的人员类型的考核项目-sysUserPath">被考核的人员类型的考核项目</Menu.Item>
        <Menu.Item key="13-班组名称-deptGroupPath">班组名称</Menu.Item>
        <Menu.Item key="14-党支部与部门-sysUserPath">党支部与部门</Menu.Item>
      </Menu.SubMenu>
    }
    return menuList && menuList.map(item => {
      if (item.children) {
        rootSubmenuKeys.push(item.id + '')
        let title
        if (item.icon) {
          title = <span><Icon type={item.icon}/><span>{item.name}</span></span>
        } else {
          title = <span>{item.name}</span>
        }
        return <Menu.SubMenu
          key={item.id}
          icon={item.icon ? React.createElement(item.icon) : <span/>}
          title={item.name}
          onClick={onClick}
        >
          {renderMenu(item.children)}
        </Menu.SubMenu>
      }
      return <Menu.Item key={item.id + '-' + item.name + '-' + item.path}>{item.name}</Menu.Item>
    })
  }

  const closeTabPane = () => {
    let arr = [...tabPanes]
    //找到下一个tab
    let index = _.findIndex(arr, key => key === activeKey)
    if (index === 0) {
      if (arr.length > 1) {
        flagKey = arr[index + 1]
      } else {
        flagKey = '我的桌面'
      }
    } else {
      flagKey = arr[index - 1]
    }
    _.remove(arr, key => key === activeKey)
    setTabPanes(arr)
    //设置不起作用
    // setActiveKey(flagKey)
  }

  const renderTabPane = () => {
    if (flagKey) {
      setActiveKey(flagKey)
      flagKey = undefined
    }
    return tabPanes.map(key => {
      let [id, name, path] = key.split('-')
      let realPath = utils[path]
      let tab = name
      if (activeKey === key) {
        tab = <span>{name}
          <a onClick={closeTabPane}><CloseOutlined style={{ color: 'rgba(0,0,0,.45)', marginRight: 0, marginLeft: 6 }}/></a>
          </span>
      }
      return <Tabs.TabPane tab={tab} key={key}>
        <div style={{ padding: '0px 12px' }}>
          <realPath.List/>
        </div>
      </Tabs.TabPane>
    })
  }

  useEffect(() => {
    setOpenKeys(rootSubmenuKeys)
  }, [])

  const DropdownMenu = (
    <Menu>
      <Menu.Item>
        <div style={{ float: 'left', width: 20 }}>
          <EditOutlined/>
        </div>
        <a onClick={() => {
        }}>修改密码</a>
      </Menu.Item>
    </Menu>
  )

  return <Layout>
    <Header style={{ backgroundColor: '#1890ff', padding: 0, color: '#fff' }}>
      <span className={collapsed ? 'left-none' : 'left-block'}>{collapsed ? 'YJ' : 'YeJi'}</span>
      {
        React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => {
            setCollapsed(!collapsed)
          }
        })
      }
      <span className='web-name'>业绩考核系统</span>
      <div className='right'>
        <Dropdown overlay={DropdownMenu} className='user'>
          <span>
            <UserOutlined style={{ paddingRight: 5, fontSize: 20 }}/>
          欢迎你,zhangsan
          </span>
        </Dropdown>
        <span className='user'>
            <Button
              type={'link'} style={{ color: '#fff', fontSize: 16 }}
              onClick={async () => {

              }}>
              <LogoutOutlined/>退出登录
            </Button>
          </span>
      </div>
    </Header>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#fff' }} width={300}>
        <Menu theme="light" mode="inline" selectedKeys={[activeKey]} openKeys={openKeys}
              onOpenChange={(openkeys) => setOpenKeys(openkeys)}>
          {renderMenu(utils.session.getItem('menuList'))}
        </Menu>
      </Sider>
      <Content style={{ minHeight: document.body.clientHeight - 70 }}>

        <Tabs tabBarStyle={{ background: '#fff', height: 60 }}
              tabBarGutter={0} animated={false}
              activeKey={activeKey} onTabClick={key => setActiveKey(key)}>
          <Tabs.TabPane tab="我的桌面" key="我的桌面">
            <div style={{ padding: '0px 12px' }}>
              我的桌面
            </div>
          </Tabs.TabPane>
          {renderTabPane()}
        </Tabs>
      </Content>
    </Layout>
  </Layout>

}
