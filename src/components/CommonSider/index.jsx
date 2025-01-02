import React from 'react'
import * as Icon from '@ant-design/icons';
import {GithubOutlined} from '@ant-design/icons'
import { Layout, Menu } from 'antd';
import MenuConfig from '../../config'

const { Sider } = Layout;

// 获取路由配置，来源后端接口返回

const iconnameToElement = ((iconname) => React.createElement(Icon[iconname]))
const items = MenuConfig.map((item) => {
  // 没有子菜单
  const child = {
    key: item.key,
    label: item.label,
    icon: iconnameToElement(item.icon)
  }
  // 有子菜单就在chidren属性内部 map return
  if (item.children) {
    child.children = item.children.map((item) => {
      return {
        key: item.key,
        label: item.label
      }
    })
  }
  // 合并return child
  return child
})


// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
// const items = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];

export default function CommonSider({collapsed}) {
  console.log('CommonSider中collapsed状态', collapsed)
  return (
    <div>
      {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}> */}
      <Sider style={{minHeight: '100%'}} collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h3 style={{ color: 'white', textAlign: 'center' }}><GithubOutlined />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{!collapsed ? 'React-admin' : ''}</h3>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </div>
  )
}
