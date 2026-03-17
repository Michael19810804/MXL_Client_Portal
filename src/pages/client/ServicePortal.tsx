import React, { useRef, useState } from 'react';
import { Tabs, Affix } from 'antd';
import { 
  HomeOutlined,
  AppstoreOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import PropertyTab from './tabs/PropertyTab';
import ApartmentTab from './tabs/ApartmentTab';

const ServicePortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') || 'property';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const tabKeys = ['property', 'apartment'];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    navigate(`?tab=${key}`, { replace: true });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    const currentIndex = tabKeys.indexOf(activeTab);
    if (currentIndex === -1) return;

    if (deltaX < 0 && currentIndex < tabKeys.length - 1) {
      handleTabChange(tabKeys[currentIndex + 1]);
      return;
    }

    if (deltaX > 0 && currentIndex > 0) {
      handleTabChange(tabKeys[currentIndex - 1]);
    }
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
  ];

  return (

    <div className="min-h-screen bw-shell pb-20 md:pb-12">
      <div className="max-w-5xl mx-auto px-0 md:px-8 mt-0 md:mt-8 relative z-20">
        <div
          className="bw-card min-h-[600px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Tabs 
            activeKey={activeTab}
            onChange={handleTabChange}
            items={items}
            centered
            size="small"
            tabBarGutter={8}
            tabBarStyle={{ marginBottom: 0, paddingTop: 12 }}
            className="custom-tabs p-0 md:p-10"
            animated={{ inkBar: true, tabPane: true }}
          />
        </div>
      </div>

      <Affix style={{ position: 'fixed', bottom: 80, right: 20, zIndex: 1000 }}>
        <button 
          className="w-12 h-12 md:w-14 md:h-14 bg-black rounded-full shadow-[4px_4px_0_#000] flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer border-2 border-black focus:outline-none"
          onClick={() => alert('请添加客服微信: MXL_Service')}
          title="联系客服"
        >
          <PhoneOutlined style={{ fontSize: '20px' }} className="md:text-2xl" />
        </button>
      </Affix>
    </div>
  );
};

export default ServicePortal;
