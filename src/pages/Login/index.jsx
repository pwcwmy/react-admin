import React from 'react'
import { Form, Input, Button, message } from 'antd';
import "./index.css"
import { getMenu } from '../../api';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()
  
  // 在登录状态下， 要重定向到home主页
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" replace />  
  }
  // 去CommonHeader中实现登出逻辑, 先清除token
  
  const handleSubmit = (val) => {
    console.log('用户登录输入', val)
    if (!val.username || !val.password) {
      return message.open({
        type: 'warning',
        content: '请输入用户名和密码'
      })
    }
    getMenu(val).then(({data}) => {
      console.log(data)
      localStorage.setItem("token", data.data.token)
      navigate('/home')
    })
  }
  
  return (
    <Form
      className="login-container"
      onFinish={handleSubmit}
    >
      <div className="login_title">系统登录</div>
      <Form.Item
        label="账号"
        name="username"
      >
        <Input placeholder="请输入账号" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
      >
        {/* Password也要首字母大写 */}
        <Input.Password placeholder="请输入账号" /> 
      </Form.Item>
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit">登录</Button>
      </Form.Item>
    </Form>
  )
}

export default Login