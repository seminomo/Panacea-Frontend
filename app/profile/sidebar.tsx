import Link from 'next/link';
import Image from 'next/image';

interface Props {
  Username: string;
}

export default function SideBar(props: Props) {
  return (
    <aside className="h-full w-64">
      <div className="rounded-l bg-primary-200">
        <div className="mb-4 flex flex-col p-4">
          <h5 className="flex gap-1 align-baseline">
            <Image src="/account.svg" alt="icon" width={22} height={22} />
            <span className="text-xl">{props.Username}</span>
          </h5>
          <div className="flex flex-col pl-7">
            <span className="flex justify-between">
              <span>教練審核狀態</span>
              <div className="flex gap-1 align-baseline">
                <Image src={'./checked.svg'} alt={'icon'} width={22} height={22} />
                <span>已審核</span>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-l bg-primary-200">
        <div className="flex flex-col">
          <div className="flex flex-col py-4 pl-4">
            <div className="flex gap-1 align-baseline">
              <Image src={'./book.svg'} alt={'icon'} width={22} height={22} />
              <span>學員中心</span>
            </div>
            <div className="flex flex-col pl-7">
              <Link href={'/profile/user'}>帳號設定</Link>
              <Link href={'/profile/user/booking'}>預約課程</Link>
              <Link href={'/profile/user/purchased'}>已購買課程</Link>
            </div>
          </div>
          <div className="px-5">
            <div className="border-black border-b border-dashed"></div>
          </div>
          <div className="flex flex-col py-4 pl-4">
            <div className="flex gap-1 align-baseline">
              <Image src={'./profession.svg'} alt={'icon'} width={22} height={22} />
              <span>教練檔案</span>
            </div>
            <div className="flex flex-col pl-7">
              <Link href={'/profile/coach'}>教練檔案</Link>
              <Link href={'/profile/course-manage'}>課程管理</Link>
              <Link href={'/profile/course-list'}>課程清單</Link>
            </div>
          </div>
          <div className="px-5">
            <div className="border-black border-b border-dashed"></div>
          </div>
          <div className="flex flex-col py-4 pl-4">
            <div className="flex gap-1 align-baseline">
              <Image src={'./manage.svg'} alt={'icon'} width={22} height={22} />
              <span>系統管理員</span>
            </div>
            <div className="flex flex-col pl-7">
              <Link href={'/admin'}>進入後台</Link>
            </div>
          </div>
          <div className="px-5">
            <div className="border-black border-b border-dashed"></div>
          </div>
          <div className="py-4 pl-4">
            <button className="flex gap-1 align-baseline">
              <Image src={'./logout.svg'} alt={'icon'} width={22} height={22} />
              <span>登出</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
