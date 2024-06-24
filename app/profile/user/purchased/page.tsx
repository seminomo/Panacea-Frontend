'use client';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PurchasedCourseCard from './components/PurchasedCourseCard';

// const onChange = (key: string) => {
//   console.log(key);
// };
const items: TabsProps['items'] = [
  {
    key: 'success',
    label: '已完成購買',
    children: <PurchasedCourseCard status={'success'}></PurchasedCourseCard>,
  },
  {
    key: 'pending',
    label: '未付款',
    children: <PurchasedCourseCard status={'pending'}></PurchasedCourseCard>,
  },
  {
    key: 'fail',
    label: '已取消',
    children: <PurchasedCourseCard status={'fail'}></PurchasedCourseCard>,
  },
];

const PurchasedPage: React.FC = () => {
  return <Tabs className="w-full" defaultActiveKey="success" items={items} />;
};

export default PurchasedPage;
