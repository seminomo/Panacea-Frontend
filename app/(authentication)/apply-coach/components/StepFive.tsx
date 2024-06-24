'use client';
import useFormStore from '@/stores/applyCoachFormStore';
import { Button, Form, Checkbox, message } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const StepFive: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { formData, prevStep } = useFormStore();

  // Define the structure of the request body
  // interface RequestBody {
  //   language: [];
  //   subject: string;
  //   specialty: string;
  //   workExperience: Object;
  //   education: Object;
  //   certifiedDocuments: string[];
  // }

  // get submit data
  const onFinish = async () => {
    setLoading(true);
    try {
      await applyCoach(formData);
    } finally {
      setLoading(false);
    }
  };

  const applyCoach = async (postData: any): Promise<void> => {
    try {
      const apiPath = '/api/apply-coach';
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('failed');
      }
      const data = await response.json();
      if (data.code !== 200) {
        message.error(data.message);
        return;
      }
      router.push('/profile/coach');
      message.success('申請成功！');
    } catch (error) {
      message.error('發生錯誤｜請稍候再試！');
    }
  };

  return (
    <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center">
      <Form form={form} initialValues={formData} className="w-1/2 max-w-[400px]" layout="vertical" onFinish={onFinish}>
        <div className="pb-5 pt-10">
          <h3 className="text-lg">申請教練注意事項</h3>
          <p className="pb-3">
            親愛的教練您好，竭誠歡迎您的加入，成為 Panacea 的一份子。我們係依據本服務條款，提供 Panacea
            服務，請於註冊成為教練之前，詳細閱讀並勾選以下教練服務條款內容。當勾選完畢，即視為您已閱讀本同意書，並同意遵守以下所有同意書之教練會員規範：
          </p>
          <ul className="list-disc text-neutral-600">
            <li>教練須在上課時間進入官方指定 ZOOM 教室，以視訊方式進行授課。</li>
            <li>教練將於每月 2 號開放提領上月薪資，每月 15 號取得當月欲提領之款項。</li>
            <li>
              教練排序是綜合教師表現結果。若教練表現突出（例如：上線時間多、銷售課程、完成授課、團隊教師們互助合作……等等）都會讓排名提升並大大增加曝光率。
            </li>
            <li>若教練無故遲到、早退、或經檢舉上課有不良紀錄，本公司 有權力將老師立即下架並終止與老師的合約。</li>
            <li>教練必須同意本公司 訂定之行銷策略，並配合推廣與執行（所有行銷策略的出發點皆為幫助老師增加收入）</li>
            <li>
              若發現教練有任何導致 本公司
              品牌聲譽受損的惡意毀謗、或任何將學生導出網站私下貼連結與交易行為，將立即下架教練帳號，本公司
              將保留追究法律責任的權益。
            </li>
          </ul>
        </div>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('請勾選同意條款'))),
            },
          ]}
        >
          <Checkbox>同意以上條款</Checkbox>
        </Form.Item>
        <div className="flex justify-end gap-2">
          <div className="felx-1">
            <Button block type="primary" ghost onClick={prevStep}>
              上一步
            </Button>
          </div>
          <Form.Item className="felx-1">
            <Button block type="primary" htmlType="submit" loading={loading}>
              送出申請
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default StepFive;
