import React from 'react';
import { Button, Card, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const DocumentPreview: React.FC = () => {
  const navigate = useNavigate();
  const { docType } = useParams();

  const titleMap: Record<string, string> = {
    'contract-template': '合约模版',
    'management-agreement': '托管协议'
  };

  const docTitle = titleMap[docType || ''] || '文档详情';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bw-shell">
      <div className="mb-4">
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="bw-btn-ghost"
        >
          返回
        </Button>
      </div>
      <Card className="bw-card">
        <Title level={2} className="m-0 text-black text-2xl md:text-3xl">{docTitle}</Title>
        <Paragraph className="mt-6 mb-0 text-black text-lg md:text-2xl leading-8 md:leading-10">
          顺则凡，逆则仙
        </Paragraph>
      </Card>
    </div>
  );
};

export default DocumentPreview;
