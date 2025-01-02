import React from 'react'
import { Button, Form, Input} from 'antd'
import './index.css'

export default function User() {
  const handleClick = () => {
    
  }
  // 提交表单
  const handleFinish = (e) => {
      console.log('表单内容', e)
  }
  
  return (
    <div className='user'>
      <div className='flex-box space-between'>
        <Button type='primary' onClick={() => handleClick('add')}>+新增</Button>
        <Form layout='inline' onFinish={handleFinish}>
            <Form.Item name="keyword">
              <Input placeholder='请输入用户名'/>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type='primary'>搜索</Button>
            </Form.Item>
        </Form>
      </div>
      User页面
    </div>
  )
}
