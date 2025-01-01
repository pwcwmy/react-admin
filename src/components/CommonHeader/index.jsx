import React from 'react'
import { Layout, Avatar, Button, Dropdown } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.css'
import { useDispatch } from 'react-redux';
import {collapseMenu} from '../../store/reducers/tab'
const { Header } = Layout;
// 解构参数语法拿到参数collapsed
export default function CommonHeader({collapsed}) {
  // 退出按钮
  const logout = () => {

  }
  // 创建dispatch
  const dispatch = useDispatch()
  // 点击展开收起按钮回调
  const setCollapsed = () => {
    console.log('CommonHeader中点击按钮后',collapsed)
    dispatch(collapseMenu())
  }

  // 头像下拉菜单数据menu
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onclick={() => logout} target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          退出
        </a>
      ),
    }]

  return (
    <div>
      <Header className='header-container'>
        <Button
          type='text'
          icon={<MenuFoldOutlined />}
          style={{
            fontSize: '16px',
            width: 40,
            height: 40,
            backgroundColor: '#fff'
          }}
          onClick={()=>setCollapsed()}
        />
        <Dropdown menu={{items}}> 
          {/* src可以传入string或者ReactNode */}
          <Avatar size={40} src={<img src={require("../../assets/images/user.png")} alt='user' />} />
        </Dropdown>
      </Header>
    </div>
  )
}
