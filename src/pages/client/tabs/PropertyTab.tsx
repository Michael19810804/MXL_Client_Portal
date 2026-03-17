import React from 'react';
import { Typography, Button, Card, Divider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const PropertyTab: React.FC = () => {
  const navigate = useNavigate();
  const coreServices = [
    {
      title: '高效招租',
      content: '整合本地多渠道资源，精准匹配优质租客，缩短房屋空置期。'
    },
    {
      title: '租务管理',
      content: '代办租约签署、押金管理、代收租金及水电杂费缴纳，提供清晰的财务报单。'
    },
    {
      title: '深度维护',
      content: '即时响应，资产保值。我们实时跟踪租客反馈，第一时间介入修缮事宜。代业主对接本地工匠并监督施工，确保房屋状态始终如新，让您远程掌控无忧。'
    }
  ];
  const advantages = [
    {
      title: '无障碍沟通',
      content: '纯中文对接服务，为您省去跨国沟通的烦恼，确保您的指令得到100%执行。'
    },
    {
      title: '透明化管理',
      content: '坚持费用透明、进度实时反馈，让每一笔支出和收入都清晰可查。'
    },
    {
      title: '全流程系统支撑',
      content: '曼谷唯一一家可以提供全流程邮件通知支撑的托管商，让你的曼谷房产账务有一种银行通知的错觉，非常直观简单。绝不存在账务不清晰，不清不楚的问题。'
    }
  ];

  return (
    <div className="space-y-5 md:space-y-7 animate-fade-in p-4 md:p-0 overflow-hidden">
      <Card className="border-2 border-black shadow-[6px_6px_0_#000] rounded-2xl overflow-hidden bg-white">
        <div className="px-5 pt-7 pb-4 md:px-10 md:pt-10 md:pb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full border-2 border-black text-black text-xs md:text-sm tracking-wide mb-4 font-semibold">
            MXL PROPERTY CARE
          </div>
          <Title level={2} className="m-0 text-black text-2xl md:text-4xl font-semibold">
            海外资产托管的商务级解决方案
          </Title>
          <Paragraph className="text-gray-700 text-sm md:text-base leading-7 mt-4 mb-5 max-w-3xl">
            通过本地化团队与全流程协同能力，为在泰业主提供稳定、高效、透明的托管服务体验。
          </Paragraph>
          <div className="mb-2 flex items-center gap-3 flex-wrap">
            <Button type="default" className="h-10 md:h-12 px-4 md:px-6 text-base md:text-lg font-semibold border-2 border-black bg-white text-black rounded-xl" onClick={() => navigate('/docs/contract-template')}>
              合约模版
            </Button>
            <Button type="default" className="h-10 md:h-12 px-4 md:px-6 text-base md:text-lg font-semibold border-2 border-black bg-white text-black rounded-xl" onClick={() => navigate('/docs/management-agreement')}>
              托管协议
            </Button>
          </div>
        </div>
      </Card>

      <Card className="border-2 border-black shadow-[4px_4px_0_#000] rounded-2xl bg-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center">01</span>
          <Title level={3} className="m-0 text-xl md:text-2xl">我们能做啥</Title>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coreServices.map((item) => (
            <div key={item.title} className="rounded-xl border-2 border-black bg-[#f7f7f7] p-4 md:p-5">
              <div className="text-black font-semibold text-base md:text-lg mb-2">{item.title}</div>
              <Paragraph className="text-gray-700 text-sm md:text-base leading-7 mb-0">
                {item.content}
              </Paragraph>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-2 border-black shadow-[4px_4px_0_#000] rounded-2xl bg-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center">02</span>
          <Title level={3} className="m-0 text-xl md:text-2xl">服务优势</Title>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advantages.map((item) => (
            <div key={item.title} className="rounded-xl border-2 border-black bg-white p-4 md:p-5">
              <div className="text-black font-semibold text-base md:text-lg mb-2">{item.title}</div>
              <Paragraph className="text-gray-700 text-sm md:text-base leading-7 mb-0">
                {item.content}
              </Paragraph>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-2 border-black shadow-[4px_4px_0_#000] rounded-2xl text-center bg-[#f9f9f9]">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="w-9 h-9 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center">03</span>
          <Title level={3} className="m-0 text-xl md:text-2xl">努力目标</Title>
        </div>
        <Divider className="my-4 border-black" />
        <Paragraph className="text-gray-700 text-sm md:text-base leading-7 mb-0">
          为1000套曼谷房间提供独家，极致化系统托管服务。
        </Paragraph>
      </Card>

      <div className="flex justify-center pt-1 md:pt-2">
        <Button 
          type="primary" 
          size="large" 
          icon={<RightOutlined />} 
          onClick={() => navigate('/apply')}
          className="h-10 md:h-12 px-6 md:px-8 text-base md:text-lg rounded-full shadow-[4px_4px_0_#000] hover:scale-105 transition-transform bg-black border-2 border-black"
        >
          立即申请托管
        </Button>
      </div>
    </div>
  );
};

export default PropertyTab;
