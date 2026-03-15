import React from 'react';
import { 
  Typography, 
  Button, 
  Card, 
  Row, 
  Col, 
  Space, 
  Divider,
  Tag 
} from 'antd';
import { 
  FileWordOutlined, 
  CheckCircleOutlined, 
  RightOutlined,
  HomeOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const PropertyTab: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in p-4 md:p-0">
      {/* Hero Section - Button Only */}
      <div className="flex justify-center pt-2 md:pt-4">
        <Button 
          type="primary" 
          size="large" 
          icon={<RightOutlined />} 
          onClick={() => navigate('/apply')}
          className="h-10 md:h-12 px-6 md:px-8 text-base md:text-lg rounded-full shadow-lg hover:scale-105 transition-transform bg-gradient-to-r from-blue-500 to-blue-600 border-none"
        >
          立即申请托管
        </Button>
      </div>

      {/* Services Grid */}
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={12}>
          <Card className="h-full shadow-sm hover:shadow-md transition-shadow border-t-4 border-blue-500 rounded-xl">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-blue-100 p-2 md:p-3 rounded-lg">
                <SafetyCertificateOutlined className="text-xl md:text-2xl text-blue-600" />
              </div>
              <div>
                <Title level={5} className="mb-1 md:mb-2 text-base md:text-lg">专业租赁合同</Title>
                <Paragraph className="text-gray-600 text-xs md:text-sm mb-0">
                  根据泰国法律定制的双语租赁合同，保障房东与租客的合法权益。自动生成，严谨规范。
                </Paragraph>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="h-full shadow-sm hover:shadow-md transition-shadow border-t-4 border-green-500 rounded-xl">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-green-100 p-2 md:p-3 rounded-lg">
                <HomeOutlined className="text-xl md:text-2xl text-green-600" />
              </div>
              <div>
                <Title level={5} className="mb-1 md:mb-2 text-base md:text-lg">全程房产托管</Title>
                <Paragraph className="text-gray-600 text-xs md:text-sm mb-0">
                  提供从钥匙托管、清洁维护到租客入住办理的全流程服务，让您即使身在海外也能安心收租。
                </Paragraph>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Samples Section */}
      <div id="samples" className="bg-gray-50 rounded-2xl p-4 md:p-8 mt-4 md:mt-8 border border-gray-100">
        <div className="text-center mb-4 md:mb-6">
          <Title level={4} className="text-lg md:text-xl">服务文档样本下载</Title>
          <Text type="secondary" className="text-xs">点击下方链接预览标准协议</Text>
        </div>
        
        <Row gutter={[12, 12]} justify="center">
          <Col xs={24} sm={12}>
            <Button 
              block 
              size="large" 
              icon={<FileWordOutlined />} 
              href="/Lease_agreement_SAMPLE.docx" 
              target="_blank"
              className="h-12 md:h-14 text-left flex items-center justify-center gap-2 border-dashed border-2 hover:border-blue-500 hover:text-blue-600 text-sm md:text-base"
            >
              租赁合同样本
            </Button>
          </Col>
          <Col xs={24} sm={12}>
            <Button 
              block 
              size="large" 
              icon={<FileWordOutlined />} 
              onClick={(e) => { e.preventDefault(); alert('托管协议样本即将上线'); }}
              className="h-12 md:h-14 text-left flex items-center justify-center gap-2 border-dashed border-2 hover:border-green-500 hover:text-green-600 text-sm md:text-base"
            >
              托管协议样本
              <Tag color="orange" className="ml-2 text-[10px] leading-tight px-1 py-0">即将上线</Tag>
            </Button>
          </Col>
        </Row>
      </div>

      {/* Trust Indicators */}
      <div className="text-center pt-4 pb-4">
        <Space size="middle" className="text-gray-500 text-sm flex-wrap justify-center">
          <span className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> 100+ 房源托管中</span>
          <span className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> 本地团队服务</span>
          <span className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> 24/7 紧急响应</span>
        </Space>
      </div>
    </div>
  );
};

export default PropertyTab;
