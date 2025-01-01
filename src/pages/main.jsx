// import { Outlet } from 'react-router'
import React, { useState } from 'react';
import { Layout } from 'antd';
import CommonSider from '../components/CommonSider';
import CommonHeader from '../components/CommonHeader';
import CommonContent from '../components/CommonContent';
import CommonFooter from '../components/CommonFooter';
import { useSelector } from 'react-redux';

export default function Main() {
  // const [collapsed, setCollapsed] = useState(false);
  // 获取展开收起状态
  const collapsed = useSelector(state => state.tab.isCollapse)
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }} >
        <CommonSider collapsed={collapsed}/>
        <Layout>
          <CommonHeader collapsed={collapsed}/>
          <CommonContent />
          <CommonFooter />
        </Layout>
      </Layout>
    </div>
  );
}

