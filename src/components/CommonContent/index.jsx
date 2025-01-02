import React from 'react'
import { Layout , Breadcrumb} from 'antd';
import { Outlet } from 'react-router'
const { Content } = Layout;

export default function CommonContent() {
  return (
    <div>
      <Content
        style={{
          margin: '0 16px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        {/* Home等页面入口 */}
        <Outlet/>
      </Content>
    </div>
  )
}
