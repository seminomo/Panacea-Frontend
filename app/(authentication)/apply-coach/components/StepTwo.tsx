'use client';
import { Button, Form, Input, Select } from 'antd';
import useFormStore from '@/stores/applyCoachFormStore';

const StepTwo = () => {
  const [form] = Form.useForm();
  const { formData, setFormData, prevStep, nextStep } = useFormStore();

  const validateMessages = {
    required: '此為必填',
  };

  // get submit data
  const onFinish = (values: any) => {
    const formData = { workExperience: values };
    setFormData(formData);
    nextStep();
  };

  const positions = [
    '工程師',
    '產品經理',
    '設計師',
    '市場經理',
    '銷售代表',
    '客服專員',
    '數據分析師',
    '人力資源',
    '財務',
    '行政助理',
    '運營管理',
    '法務',
  ];

  const { workExperience } = formData || {};

  return (
    <div className="mx-auto flex max-w-[800px] justify-center">
      <Form
        form={form}
        initialValues={workExperience}
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
        <div className="flex">
          <Form.Item className="flex-1" label="開始時間" style={{ marginBottom: 0 }}>
            <Form.Item
              name="startYear"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <Select placeholder="年份">
                {Array.from({ length: new Date().getFullYear() - 1799 }, (_, i) => (1800 + i).toString()).map(
                  (year) => (
                    <Select.Option key={year} value={year}>
                      {year}年
                    </Select.Option>
                  ),
                )}
              </Select>
            </Form.Item>
            <Form.Item
              name="startMonth"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
            >
              <Select placeholder="月份">
                {/* {Array.from({ length: 12 }, (_, i) => `${i + 1}月`).map(month => (
                  <Select.Option key={month} value={month}>
                    {month}
                  </Select.Option>
                ))} */}
                <Select.Option value="01">1月</Select.Option>
                <Select.Option value="02">2月</Select.Option>
                <Select.Option value="03">3月</Select.Option>
                <Select.Option value="04">4月</Select.Option>
                <Select.Option value="05">5月</Select.Option>
                <Select.Option value="06">6月</Select.Option>
                <Select.Option value="07">7月</Select.Option>
                <Select.Option value="08">8月</Select.Option>
                <Select.Option value="09">9月</Select.Option>
                <Select.Option value="10">10月</Select.Option>
                <Select.Option value="11">11月</Select.Option>
                <Select.Option value="12">12月</Select.Option>
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item className="flex-1" label="結束時間" style={{ marginBottom: 0 }}>
            <Form.Item
              name="endYear"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <Select placeholder="年份">
                {Array.from({ length: new Date().getFullYear() - 1799 }, (_, i) => (1800 + i).toString()).map(
                  (year) => (
                    <Select.Option key={year} value={year}>
                      {year}
                    </Select.Option>
                  ),
                )}
              </Select>
            </Form.Item>
            <Form.Item
              name="endMonth"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
            >
              <Select placeholder="月份">
                <Select.Option value="01">1月</Select.Option>
                <Select.Option value="02">2月</Select.Option>
                <Select.Option value="03">3月</Select.Option>
                <Select.Option value="04">4月</Select.Option>
                <Select.Option value="05">5月</Select.Option>
                <Select.Option value="06">6月</Select.Option>
                <Select.Option value="07">7月</Select.Option>
                <Select.Option value="08">8月</Select.Option>
                <Select.Option value="09">9月</Select.Option>
                <Select.Option value="10">10月</Select.Option>
                <Select.Option value="11">11月</Select.Option>
                <Select.Option value="12">12月</Select.Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </div>
        <Form.Item className="flex-1" label="單位名稱" name="department" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item className="flex-1" label="職務類別" name="position" rules={[{ required: true }]}>
          <Select>
            {positions.map((position) => (
              <Select.Option key={position} value={position}>
                {position}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className="flex-1" label="職務名稱" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <div className="flex justify-end gap-2">
          <div className="felx-1">
            <Button block type="primary" ghost onClick={prevStep}>
              上一步
            </Button>
          </div>
          <Form.Item className="felx-1">
            <Button block type="primary" htmlType="submit">
              下一步
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default StepTwo;
