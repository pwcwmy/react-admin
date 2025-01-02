import React from 'react'
import { Col, Row, Card } from 'antd'
import './index.css'
export default function Home() {
  const userImg = require('../../assets/images/user.png')
  return (
    <Row className='home'>
      <Col span={8}>
      <Card hoverable>
        <div className='user'>
          <img src={userImg} alt='user'/>
          <div className='userInfo'>
            <p className='name'>Admin</p>
            <p className='access'>超级管理员</p>
          </div>
        </div>
        <div className='login-info'>
          <p>上次登录时间:<span>2025-01-01</span></p>
          <p>上次登录地点<span>上海</span></p>
        </div>
      </Card>
      </Col>
      <Col span={16}></Col>
    </Row>
  )
}
