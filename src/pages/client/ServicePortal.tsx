import React, { useState } from 'react';
import { 
  Tabs, 
  Layout, 
  Typography,
  Affix,
  theme
} from 'antd';
import { 
  HomeOutlined, 
  GlobalOutlined, 
  CarOutlined, 
  AppstoreOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

// Tab Components
import PropertyTab from './tabs/PropertyTab';
import VisaTab from './tabs/VisaTab';
import ApartmentTab from './tabs/ApartmentTab';
import LifestyleTab from './tabs/LifestyleTab';

const { Title, Paragraph } = Typography;

const ServicePortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse tab from URL query param if needed, or default to 'property'
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') || 'property';
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    // Update URL without reload to allow bookmarking/sharing
    navigate(`?tab=${key}`, { replace: true });
  };

  const items = [
    {
      key: 'property',
      label: (
        <span className="px-1 md:px-2 py-1 flex items-center gap-1 md:gap-2 text-sm md:text-base">
          <HomeOutlined />
          房产托管
        </span>
      ),
      children: <PropertyTab />,
    },
    {
      key: 'apartment',
      label: (
        <span className="px-1 md:px-2 py-1 flex items-center gap-1 md:gap-2 text-sm md:text-base">
          <AppstoreOutlined />
          公寓周租
        </span>
      ),
      children: <ApartmentTab />,
    },
    {
      key: 'visa',
      label: (
        <span className="px-1 md:px-2 py-1 flex items-center gap-1 md:gap-2 text-sm md:text-base">
          <GlobalOutlined />
          签证服务
        </span>
      ),
      children: <VisaTab />,
    },
    {
      key: 'lifestyle',
      label: (
        <span className="px-1 md:px-2 py-1 flex items-center gap-1 md:gap-2 text-sm md:text-base">
          <CarOutlined />
          私人订制
        </span>
      ),
      children: <LifestyleTab />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-12">
      {/* Portal Header / Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 md:py-12 px-4 md:px-6 text-center shadow-md relative overflow-hidden h-[200px] md:h-[280px] flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Title level={1} style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 800 }} className="text-3xl md:text-5xl">
            MXL Service Center
          </Title>
          <Paragraph style={{ color: '#bfdbfe', fontWeight: 300 }} className="text-base md:text-xl">
            曼小楼 · 曼谷旅居生活服务提供商
          </Paragraph>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="max-w-5xl mx-auto px-2 md:px-8 -mt-12 md:-mt-16 relative z-20">
        <div className="bg-white rounded-xl shadow-xl min-h-[600px] overflow-hidden border border-gray-100">
          <Tabs 
            activeKey={activeTab} 
            onChange={handleTabChange} 
            items={items} 
            centered 
            size="middle"
            tabBarStyle={{ 
              marginBottom: 0, 
              paddingTop: 12, 
              backgroundColor: '#fff',
              borderBottom: '1px solid #f0f0f0' 
            }}
            className="custom-tabs p-3 md:p-10"
            animated={{ inkBar: true, tabPane: true }}
          />
        </div>
      </div>

      {/* Floating Contact Button (Mobile Friendly) */}
      <Affix style={{ position: 'fixed', bottom: 80, right: 20, zIndex: 1000 }}>
        <button 
          className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full shadow-xl flex items-center justify-center text-white hover:bg-green-600 hover:scale-110 transition-all cursor-pointer border-none focus:outline-none"
          onClick={() => alert('请添加客服微信: MXL_Service')}
          title="Contact Support"
        >
          <PhoneOutlined style={{ fontSize: '20px' }} className="md:text-2xl" />
        </button>
      </Affix>
    </div>
  );
};

export default ServicePortal;
