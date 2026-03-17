import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, SendOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const ClientLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      label: '服务中心',
      icon: <HomeOutlined />,
    },
    {
      key: '/apply',
      label: '材料上传',
      icon: <SendOutlined />,
    },
  ];

  return (
    <Layout className="min-h-screen bw-shell pb-0">
      <Header className="bg-white border-b-2 border-black px-4 md:px-6 items-center justify-end shadow-[0_3px_0_#000] sticky top-0 z-50 h-16 hidden md:flex">
        
        {/* Desktop Menu */}
        <Menu 
          mode="horizontal" 
          selectedKeys={[location.pathname]} 
          items={menuItems.map(item => ({
            ...item,
            label: <Link to={item.key}>{item.label}</Link>
          }))}
          className="border-none flex-1 justify-end min-w-[300px]"
        />
      </Header>

      <Content className="p-0 md:p-8 max-w-5xl mx-auto w-full">
        <div className="bw-card min-h-[calc(100vh-140px)] p-0 md:p-10 overflow-hidden">
          <Outlet />
        </div>
      </Content>

      <Footer className="text-center text-gray-500 bw-shell py-6 text-xs md:text-sm hidden md:block">
        HHTools ©{new Date().getFullYear()} 由 HH Group 创建
      </Footer>

    </Layout>
  );
};

export default ClientLayout;
