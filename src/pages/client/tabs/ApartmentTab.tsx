import React from 'react';
import { 
  Typography, 
  Button, 
  Card, 
  Row, 
  Col, 
  Tag,
  Badge
} from 'antd';
import { 
  EnvironmentOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ApartmentTab: React.FC = () => {
  const apartments = [
    {
      title: '通罗商圈 - 高端一居室',
      location: '素坤逸通罗区',
      price: '฿2,500 / 晚',
      tags: ['近BTS', '泳池健身房', '可做饭'],
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      features: ['高速WiFi', '全套厨具', '每日清洁']
    },
    {
      title: '河畔景观 - 豪华两居',
      location: '湄南河畔，IconSiam 商圈',
      price: '฿4,500 / 晚',
      tags: ['绝美河景', '免费接驳船', '适合家庭'],
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
      features: ['55寸智能电视', '洗衣机/烘干机', '儿童游乐区']
    },
    {
      title: 'Rama 9 - 商务公寓',
      location: '拉玛九 CBD',
      price: '฿1,800 / 晚',
      tags: ['靠近夜市', '交通便利', '性价比高'],
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop',
      features: ['办公桌椅', '24h安保', '楼下7-11']
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pt-0 md:pt-4 p-4 md:p-0">
      <Row gutter={[16, 16]}>
        {apartments.map((item, index) => (
          <Col xs={24} md={8} key={index}>
            <Badge.Ribbon text="热门" color="black" className={index === 0 ? '' : 'hidden'}>
              <Card 
                hoverable 
                cover={
                  <div className="h-40 md:h-48 overflow-hidden">
                    <img alt={item.title} src={item.image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                }
                className="h-full bw-card overflow-hidden transition-all"
                bodyStyle={{ padding: '16px' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <Title level={5} className="mb-1 line-clamp-1 text-base md:text-lg">{item.title}</Title>
                    <div className="flex items-center text-gray-400 text-xs mb-3">
                      <EnvironmentOutlined className="mr-1" /> {item.location}
                    </div>
                  </div>
                  <div className="text-black font-bold whitespace-nowrap ml-2 text-sm md:text-base">
                    {item.price}
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  {item.features.map(f => (
                    <div key={f} className="text-xs text-gray-500 flex items-center">
                      <CheckCircleOutlined className="text-green-500 mr-2" /> {f}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <Tag key={tag} className="mr-0 text-[10px] border border-black text-black bg-white">{tag}</Tag>
                  ))}
                </div>

                <Button type="primary" block size="middle" className="text-sm bw-btn">查看房态</Button>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>

      <div className="bw-card p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mt-4 md:mt-8">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-white p-2 md:p-3 rounded-full border-2 border-black">
            <span className="text-xl md:text-2xl">🏠</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 m-0 text-sm md:text-base">不仅是住宿，更是体验</h4>
            <p className="text-gray-500 text-xs md:text-sm m-0">预订满 7 天，赠送曼谷必吃美食指南及一张 BTS 交通卡。</p>
          </div>
        </div>
        <Button size="large" className="w-full md:w-auto bw-btn text-sm md:text-base">
          咨询客服
        </Button>
      </div>
    </div>
  );
};

export default ApartmentTab;
