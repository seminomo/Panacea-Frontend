import dayjs from 'dayjs';

export const convertCourseStatus = (time: string, isCanceled: boolean) => {
  /*如果時間尚未開始，顯示尚未開始
  時間已結束，顯示已完成
  isCanceled為true,顯示已取消
  */
  const now = dayjs();
  const startTime = dayjs(time);
  if (now.isBefore(startTime)) {
    return '尚未開始';
  }
  if (now.isAfter(startTime)) {
    return '已完成';
  }
  if (isCanceled) {
    return '已取消';
  }
};
