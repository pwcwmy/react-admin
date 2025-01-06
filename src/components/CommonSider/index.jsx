import React from 'react'
import * as Icon from '@ant-design/icons';
import { GithubOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd';
// 获取路由配置，来源后端接口返回
import MenuConfig from '../../config'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMenuList } from '../../store/reducers/tab'
const { Sider } = Layout;


const iconnameToElement = ((iconname) => React.createElement(Icon[iconname]))
const items = MenuConfig.map((item) => {
  // 没有子菜单
  const child = {
    key: item.path, // 在config文件中没有key, 只有path
    label: item.label,
    icon: iconnameToElement(item.icon)
  }
  // 有子菜单就在chidren属性内部 map return
  if (item.children) {
    child.children = item.children.map((item) => {
      return {
        key: item.path, // 在config文件中没有key, 只有path
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

export default function CommonSider({ collapsed }) {
  console.log('CommonSider中collapsed状态', collapsed)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  // 添加数据到store
  const setTabList = (val) => {
    dispatch(selectMenuList(val))
  }
  
  // 点击菜单
  const selectMenu = (e) => {
    console.log('点击路由菜单等到e', e)
    // 根据e.key即path去找label，从而切换tab
    let data
    MenuConfig.forEach(item => {
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item
        // 如果有子菜单
        if (e.keyPath.length > 1) {
          item.children.find(child => {
            return child.path === e.key
          })
        }
      }
    })
    
    setTabList({
      path: data.path,
      name: data.name, 
      label: data.label
    })
    navigate(e.key)
  }

  return (
    <div>
      {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}> */}
      <Sider style={{ minHeight: '100%' }} collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h3 style={{ color: 'white', textAlign: 'center' }}><GithubOutlined />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{!collapsed ? 'React-admin' : ''}</h3>
        <Menu theme="dark" mode="inline" items={items} onClick={selectMenu} />
      </Sider>
    </div>
  )
}
