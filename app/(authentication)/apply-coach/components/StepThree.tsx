'use client';
import { Button, Form, Input, DatePicker, Space } from 'antd';
import useFormStore from '@/stores/applyCoachFormStore';

const StepThree = () => {
  const [form] = Form.useForm();
  const { formData, setFormData, prevStep, nextStep } = useFormStore();

  const validateMessages = {
    required: '此為必填',
  };

  // get submit data
  const onFinish = (values: any) => {
    const formData = { education: values };
    setFormData(formData);
    nextStep();
  };

  const { education } = formData || {};

  return (
    <div className="mx-auto flex max-w-[800px] justify-center">
      <Form
        form={form}
        initialValues={education}
        className="w-1/2 max-w-[400px]"
        layout="vertical"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="my-5 flex gap-2">
          <Button ghost type="primary" onClick={nextStep}>
            下一步(測試用)
          </Button>
        </div>
        <div className="flex gap-2">
          <Form.Item name="startDate" className="flex-1" label="開始時間" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="endDate" className="flex-1" label="結束時間" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>
        </div>
        <Form.Item label="學校名稱" name="schoolName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="科系名稱" name="major" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="學位" name="degree" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item className="text-right">
          <Space>
            <Button type="primary" ghost onClick={prevStep}>
              上一步
            </Button>
            <Button block type="primary" htmlType="submit">
              下一步
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StepThree;
