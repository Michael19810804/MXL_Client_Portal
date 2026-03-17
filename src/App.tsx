import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import ClientLayout from './pages/client/ClientLayout';
import ServicePortal from './pages/client/ServicePortal';
import Apply from './pages/client/Apply';
import DocumentPreview from './pages/client/DocumentPreview';

const App: React.FC = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#2563eb',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<ServicePortal />} />
            <Route path="apply" element={<Apply />} />
            <Route path="docs/:docType" element={<DocumentPreview />} />
            {/* Fallback for any unknown route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
