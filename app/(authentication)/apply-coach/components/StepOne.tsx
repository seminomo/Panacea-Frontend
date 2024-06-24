'use client';
import useFormStore from '@/stores/applyCoachFormStore';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Select, Space } from 'antd';
const StepOne = () => {
  const [form] = Form.useForm();
  const { formData, setFormData, nextStep } = useFormStore();

  const validateMessages = {
    required: '此為必填',
  };

  // get submit data
  const onFinish = (values: any) => {
    setFormData(values);
    nextStep();
  };

  return (
    <div className="mx-auto flex max-w-[800px] justify-center">
      <Form
        form={form}
        className="w-1/2 max-w-[400px]"
        initialValues={{
          ...formData,
          language: formData?.language || [{ speakLanguage: '', languageLevel: '' }],
        }}
        layout="vertical"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="my-5 flex gap-2">
          <Button ghost type="primary" onClick={nextStep}>
            下一步(測試用)
          </Button>
        </div>
        <Form.Item label="教授科目" name="subject" rules={[{ required: true, message: '請選擇' }]}>
          <Select>
            <Select.Option value="心靈">心靈</Select.Option>
            <Select.Option value="職涯">職涯</Select.Option>
          </Select>
        </Form.Item>
        <div>
          <Form.List name="language">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="center">
                    <Form.Item
                      {...restField}
                      label="會說語言"
                      name={[name, 'speakLanguage']}
                      rules={[{ required: true, message: '請選擇' }]}
                    >
                      <Select>
                        <Select.Option value="中文">中文</Select.Option>
                        <Select.Option value="英文">英文</Select.Option>
                        <Select.Option value="台語">台語</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="程度"
                      name={[name, 'languageLevel']}
                      rules={[{ required: true, message: '請選擇' }]}
                    >
                      <Select>
                        <Select.Option value="略懂">略懂</Select.Option>
                        <Select.Option value="中等">中等</Select.Option>
                        <Select.Option value="精通">精通</Select.Option>
                      </Select>
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(name)} />
                    ) : null}
                    {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        <Form.Item className="flex-1" label="教學專長" name="specialty" rules={[{ required: true, message: '請選擇' }]}>
          <Select>
            <Select.Option value="心靈">心靈</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StepOne;
