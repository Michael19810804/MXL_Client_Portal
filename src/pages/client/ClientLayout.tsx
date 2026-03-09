import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { HomeOutlined, FileTextOutlined, SendOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const ClientLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/',
      label: '服务中心',
      icon: <HomeOutlined />,
    },
    {
      key: '/apply',
      label: '托管申请',
      icon: <SendOutlined />,
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header className="bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between shadow-sm sticky top-0 z-50 h-16">
        <div className="flex items-center gap-3 md:gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg text-white font-bold text-lg md:text-xl shadow-md">
            M
          </div>
          <Title level={5} className="m-0 text-gray-800 md:text-xl" style={{ margin: 0 }}>
            MXL Services
          </Title>
        </div>
        
        {/* Desktop Menu */}
        <Menu 
          mode="horizontal" 
          selectedKeys={[location.pathname]} 
          items={menuItems.map(item => ({
            ...item,
            label: <Link to={item.key}>{item.label}</Link>
          }))}
          className="border-none flex-1 justify-end hidden md:flex min-w-[300px]"
        />
      </Header>

      <Content className="p-3 md:p-8 max-w-5xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-sm min-h-[calc(100vh-140px)] p-4 md:p-10 overflow-hidden">
          <Outlet />
        </div>
      </Content>

      <Footer className="text-center text-gray-500 bg-gray-50 py-6 text-xs md:text-sm hidden md:block">
        HHTools ©{new Date().getFullYear()} Created by HH Group
      </Footer>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-around items-center h-16 pb-safe">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.key;
          return (
            <div 
              key={item.key}
              className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
              onClick={() => navigate(item.key)}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default ClientLayout;
