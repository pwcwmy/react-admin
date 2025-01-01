import React from 'react'
import { Layout } from 'antd';
const { Footer } = Layout;

export default function CommonFooter() {
  return (
    <div>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </div>
  )
}
