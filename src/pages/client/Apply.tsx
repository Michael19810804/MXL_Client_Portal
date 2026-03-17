import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Card, Result } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { supabase } from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;

const Apply: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const singleFileFields = ['passport', 'blueBook', 'contract', 'projectImage'];
      const fileUrls: Record<string, string | null | string[]> = {};

      for (const field of singleFileFields) {
        const fileList = values[field]?.fileList;
        if (fileList && fileList.length > 0) {
          const file = fileList[0].originFileObj;
          const fileName = `${Date.now()}_${field}_${file.name.replace(/\s+/g, '_')}`;
          
          const { data, error } = await supabase.storage
            .from('compliance_uploads')
            .upload(fileName, file);

          if (error) throw error;
          fileUrls[field] = data.path;
        } else {
          fileUrls[field] = null;
        }
      }

      const titleDeedFiles = values.titleDeed?.fileList;
      if (titleDeedFiles && titleDeedFiles.length > 0) {
        const uploadedPaths: string[] = [];
        for (let i = 0; i < titleDeedFiles.length; i++) {
          const file = titleDeedFiles[i].originFileObj;
          const fileName = `${Date.now()}_titleDeed_${i}_${file.name.replace(/\s+/g, '_')}`;
          
          const { data, error } = await supabase.storage
            .from('compliance_uploads')
            .upload(fileName, file);

          if (error) throw error;
          uploadedPaths.push(data.path);
        }
        fileUrls['titleDeed'] = uploadedPaths.join(',');
      } else {
        fileUrls['titleDeed'] = null;
      }

      const projectImagePath = typeof fileUrls.projectImage === 'string' ? fileUrls.projectImage : null;
      const mergedRemarks = [values.remarks?.trim(), projectImagePath ? `项目参考图: ${projectImagePath}` : null]
        .filter(Boolean)
        .join('\n');

      const { error: insertError } = await supabase
        .from('compliance_records')
        .insert([
          {
            name: values.name,
            phone: values.phone,
            email: values.email,
            project: values.project || null,
            unit: values.unit || null,
            layout: values.layout || null,
            remarks: mergedRemarks || null,
            passport_url: fileUrls.passport,
            title_deed_url: fileUrls.titleDeed,
            blue_book_url: fileUrls.blueBook,
            contract_url: fileUrls.contract
          }
        ]);

      if (insertError) throw insertError;

      setCurrentStep(1);
      message.success('提交成功！资料已归档。');
      
    } catch (error: any) {
      console.error('Submission error:', error);
      message.error(`提交失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: () => false, // Prevent auto upload
    maxCount: 1,
    listType: 'picture' as const,
  };

  const multipleUploadProps = {
    beforeUpload: () => false,
    multiple: true,
    maxCount: 10,
    listType: 'picture' as const,
  };

  if (currentStep === 1) {
    return (
      <Result
        status="success"
        title="资料提交成功！"
        subTitle="我们已收到并归档您的托管资料，后续可在后台统一管理与查看。"
        extra={[
          <Button type="primary" key="home" onClick={() => navigate('/')}>
            返回首页
          </Button>,
          <Button key="again" onClick={() => { setCurrentStep(0); form.resetFields(); }}>
            提交新的申请
          </Button>,
        ]}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 bw-shell">
      <div className="mb-8 text-center px-4">
        <h1 className="text-xl md:text-2xl font-bold mb-2">提交托管资料</h1>
        <p className="text-gray-500 text-sm md:text-base">请填写基础信息并上传文件，提交后即完成归档。</p>
      </div>

      <Card className="bw-card mx-4 md:mx-0">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
          size="large"
        >
          <div className="bg-[#f7f7f7] p-4 rounded-lg mb-6 border-2 border-black">
            <h3 className="font-bold text-black mb-2 text-sm md:text-base">所需文件清单</h3>
            <ul className="list-disc list-inside text-xs md:text-sm text-black space-y-1">
              <li>护照首页照片 (必需)</li>
              <li>地契复印件/照片 (必需)</li>
              <li>房屋户口本 (小蓝本) (必需)</li>
              <li>项目/小区名称或项目参考图 (二选一)</li>
              <li>补充合同文件 (可选)</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="您的姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="例如: 张三" />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="联系电话"
              rules={[{ required: true, message: '请输入联系电话' }]}
            >
              <Input placeholder="+66 81 234 5678" />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label="电子邮箱"
            rules={[{ required: true, type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input placeholder="例如: name@example.com" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="project"
              label="项目/小区"
              rules={[
                {
                  validator: async (_, value) => {
                    const imageList = form.getFieldValue('projectImage')?.fileList;
                    if ((value && String(value).trim()) || (imageList && imageList.length > 0)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('请填写项目/小区或上传项目参考图'));
                  }
                }
              ]}
            >
              <Input placeholder="例如: XX Residence（不清楚可上传项目参考图）" />
            </Form.Item>
          </div>

          <Form.Item
            name="projectImage"
            label="项目参考图/地图截图"
            tooltip="若不清楚项目名称，可上传定位截图或小区图片"
            extra="项目/小区文字与项目参考图二选一即可"
          >
            <Dragger
              {...uploadProps}
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              className="bg-white border-2 border-black rounded-xl"
              onChange={() => {
                form.validateFields(['project']).catch(() => undefined);
              }}
            >
              <p className="ant-upload-drag-icon"><UploadOutlined className="text-black" /></p>
              <p className="ant-upload-text text-sm">点击或拖拽上传项目参考图 (可选)</p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="unit"
            label="房号"
            rules={[{ required: true, message: '请输入房号' }]}
          >
            <Input placeholder="例如: A-1205" />
          </Form.Item>

          <Form.Item
            name="layout"
            label="户型"
          >
            <Input placeholder="例如: 1房1厅 / 2房2卫" />
          </Form.Item>

          <Form.Item
            name="remarks"
            label="备注"
          >
            <Input.TextArea rows={3} placeholder="可补充房屋情况、交接信息等" />
          </Form.Item>

          <Form.Item
            name="passport"
            label="护照首页"
            rules={[{ required: true, message: '请上传护照首页' }]}
            tooltip="清晰的护照个人信息页照片"
          >
            <Dragger {...uploadProps} accept=".jpg,.jpeg,.png,.pdf" className="bg-white border-2 border-black rounded-xl">
              <p className="ant-upload-drag-icon"><UploadOutlined className="text-black" /></p>
              <p className="ant-upload-text text-sm">点击或拖拽上传护照</p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="titleDeed"
            label="地契"
            rules={[{ required: true, message: '请上传地契文件' }]}
            tooltip="支持上传多张图片或PDF文件"
          >
            <Dragger {...multipleUploadProps} accept=".jpg,.jpeg,.png,.pdf" className="bg-white border-2 border-black rounded-xl">
              <p className="ant-upload-drag-icon"><UploadOutlined className="text-black" /></p>
              <p className="ant-upload-text text-sm">点击或拖拽上传地契 (支持多选)</p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="blueBook"
            label="房屋户口本 (小蓝本)"
            rules={[{ required: true, message: '请上传房屋户口本' }]}
          >
            <Dragger {...uploadProps} accept=".jpg,.jpeg,.png,.pdf" className="bg-white border-2 border-black rounded-xl">
              <p className="ant-upload-drag-icon"><UploadOutlined className="text-black" /></p>
              <p className="ant-upload-text text-sm">点击或拖拽上传小蓝本</p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="contract"
            label="补充合同文件"
            tooltip="可上传已有合同或其他需要归档的补充文件"
          >
            <Dragger {...uploadProps} accept=".jpg,.jpeg,.png,.pdf" className="bg-white border-2 border-black rounded-xl">
              <p className="ant-upload-drag-icon"><UploadOutlined className="text-black" /></p>
              <p className="ant-upload-text text-sm">点击或拖拽上传 (可选)</p>
            </Dragger>
          </Form.Item>

          <Form.Item className="mb-0 mt-8">
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large" 
              loading={loading}
              className="h-12 text-lg font-semibold active:scale-95 transition-transform bw-btn"
            >
              提交申请
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Apply;
