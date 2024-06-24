'use client';
import { Steps } from 'antd';

import useFormStore from '@/stores/applyCoachFormStore';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import StepFive from './components/StepFive';

export default function ApplyCoach() {
  // step
  const { step } = useFormStore();

  return (
    <div style={{ height: 'calc(100vh - 104px)' }} className="h-screen">
      <div className="mx-auto max-w-[800px] pt-[150px]">
        <Steps
          current={step - 1}
          items={[
            {
              title: '基本資料',
            },
            {
              title: '工作經驗',
            },
            {
              title: '學歷背景',
            },
            {
              title: '教學證照',
            },
            {
              title: '注意事項',
            },
          ]}
        />
      </div>
      <div>
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        {step === 4 && <StepFour />}
        {step === 5 && <StepFive />}
      </div>
    </div>
  );
}
