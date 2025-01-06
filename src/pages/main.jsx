import React from 'react';
import { Layout } from 'antd';
import CommonSider from '../components/CommonSider';
import CommonHeader from '../components/CommonHeader';
import CommonContent from '../components/CommonContent';
import CommonFooter from '../components/CommonFooter';
import CommonTag from '../components/CommonTag';
import { useSelector } from 'react-redux';
import RouterAuth from '../router/RouterAuth';


export default function Main() {
  // const [collapsed, setCollapsed] = useState(false);
  // 获取展开收起状态
  const collapsed = useSelector(state => state.tab.isCollapse)
  return (
    <div>
      <RouterAuth>
        <Layout style={{ minHeight: '100vh' }} >
          <CommonSider collapsed={collapsed} />
          <Layout>
            <CommonHeader collapsed={collapsed} />
            <CommonTag />
            <CommonContent />
            <CommonFooter />
          </Layout>
        </Layout>
      </RouterAuth>
    </div>
  );
}

