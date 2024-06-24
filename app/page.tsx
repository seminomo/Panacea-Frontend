import Image from 'next/image';
import bg from '../public/bg-search.svg';

interface LandingOption {
  title: string;
  description: string;
  img?: string;
  url?: string;
  sidebar?: string;
  slogan?: string;
}

const searchCourse: LandingOption[] = [
  {
    title: '利用不同篩選條件搜尋',
    description: '可以利用課程類別、上課時間，選擇你想要的課程，也可以在課程頁面看到教練資訊以及其他學員的評價。',
    sidebar: 'search',
    img: '',
  },
  {
    title: '彈性預約課程',
    description:
      '購買課程後，可以在教練行事曆上選擇有空的時間預約。預約成功後，會收到成功通知，並將課程加入學員的行事曆中。',
    sidebar: 'reserve',
    img: '',
  },
  {
    title: '任意地點上課',
    description: '課程時間到時，只要利用 Zoom 就可利用手機、電腦或是平板開啟課程，就可以開始上課。',
    sidebar: 'anywhere',
    img: '',
  },
];

const coachSteps: LandingOption[] = [
  {
    title: '註冊成為教練',
    description: '點選成為教練，填入表單資料並上傳相關證件後，經過審核即可成為教練。',
    img: '',
  },
  {
    title: '上架課程',
    description: '為你的課程寫上專屬的介紹，並選擇課堂數量及可選擇的上課時間。',
    img: '',
  },
  {
    title: '媒合學員',
    description: '當有學員預約課程成功後，會有成功通知並在行事曆上添加行程，時間到後就可以使用 Zoom 開始上課。',
    img: '',
  },
];

const whyPanacea: LandingOption[] = [
  {
    title: '便利',
    description: '購買課程後，只要在期限前可以任意選擇與教練上課的時間。',
    slogan: '挑選自己喜歡的上課時間',
  },
  {
    title: '專業',
    description: '每位教練的過往履歷都一覽無遺，可以選擇自己喜歡的專業項目。',
    slogan: '每次上課絕對收穫滿滿',
  },
  {
    title: '安全',
    description: '每位教練都經過網站的身份驗證以及專業證照認證。',
    slogan: '不怕遇到教學品質不佳的老師',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section
        style={{ backgroundImage: `url(${bg.src})` }}
        className="mb-[80px] flex h-[640px] w-full items-center justify-center gap-[130px] bg-cover pt-[95px]"
      >
        <div>
          <div className="mb-[40px]">
            <h2 className="heading1 font-bold">尋找最適合你的課程</h2>
            <span className="heading6">讓我們陪著你尋找答案</span>
          </div>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-[80px] border-[2px] border-primary-500 p-[18px]"
              placeholder="請輸入想尋找的課程"
            />
            <button className="absolute right-[8px] top-[50%] flex translate-y-[-50%] items-center rounded-[80px] bg-primary-500 px-[16px] py-[8px]">
              <Image className="mr-[8px]" src="/icon-search.svg" alt="icon" width={20} height={20} />
              <span className="body text-[#fafafa]">搜尋</span>
            </button>
          </div>
        </div>
        <Image src="/web-search.svg" alt="icon" width={525} height={410} />
      </section>
      <section className="mb-[80px]">
        <h3 className="heading1 mb-[72px] flex justify-center font-bold">
          熱門
          <span className="text-primary-500">課程</span>
          <Image className="ml-[5px] translate-y-[-15px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
        <Image src="/test.png" alt="icon" width={1296} height={640} />
      </section>
      <section className="mb-[80px]">
        <h3 className="heading1 mb-[72px] flex justify-center font-bold">
          尋找最適合你的
          <span className="text-primary-500">課程</span>
          <Image className="ml-[5px] translate-y-[-15px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
        <ul className="flex flex-col gap-[40px]">
          {searchCourse.map(({ title, description, sidebar }, index) => (
            <li
              className="flex w-[1296px] items-center justify-center gap-[25px] rounded-[120px] pb-[80px] pt-[100px] even:flex-row-reverse"
              key={index}
              style={{
                background:
                  index % 2
                    ? 'linear-gradient(90deg, rgba(23, 127, 172, 0) 0%, rgba(23, 127, 172, 0.1) 100%)'
                    : 'linear-gradient(90deg, rgba(23, 127, 172, 0.1) 0%, rgba(23, 127, 172, 0) 100%)',
              }}
            >
              <div className="flex items-start justify-center gap-[24px]">
                <Image src="landing-arrow.svg" alt="icon" width={48} height={48} className="translate-y-[-10px]" />
                <div className="max-w-[533px]">
                  <h4 className="heading2 mb-[32px]">{title}</h4>
                  <p className="heading5">{description}</p>
                </div>
              </div>
              <Image src="/test.png" alt="icon" width={416} height={215} />
              <p
                className="heading3 ml-[24px] translate-y-[-80px] underline underline-offset-[8px]"
                style={{ writingMode: 'vertical-lr' }}
              >
                {sidebar}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section className="relative mb-[80px] flex w-full flex-col items-center justify-center bg-[#BCE3FA33] pb-[200px] pt-[120px]">
        <Image className="absolute left-0 top-[300px]" src="/left-icon.svg" alt="icon" width={200} height={790} />
        <Image className="absolute bottom-[10px] right-0" src="/right-icon.svg" alt="icon" width={250} height={900} />
        <h3 className="heading1 mb-[72px] flex justify-center font-bold">
          成為 Panacea 的<span className="text-primary-500">線上教練</span>
          <Image className="ml-[5px] translate-y-[-15px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
        <ul className="flex w-[1296px] flex-col rounded-[32px] bg-[#fff] px-[16px] py-[48px]">
          {coachSteps.map(({ title, description }, index) => (
            <li
              className="relative flex items-center border-dashed border-[#BCE3FA] px-[94px] py-[48px] [&:nth-child(1)]:border-b [&:nth-child(2)]:border-b"
              key={index}
            >
              <Image src="/test.png" alt="icon" width={525} height={320} />
              <div className="flex w-[526px] flex-col gap-[32px] px-[48px]">
                <div className="heading3 w-[175px] rounded-[40px] bg-second-400 px-[36px] py-[8px] text-center">
                  Step{index + 1}
                </div>
                <h4 className="heading2">{title}</h4>
                <p className="heading5">{description}</p>
              </div>
              {index !== 2 ? (
                <Image
                  className="absolute bottom-[-24px] right-1/2 translate-x-1/2"
                  src="/down-arrow.svg"
                  alt="icon"
                  width={48}
                  height={48}
                />
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-[80px]">
        <h3 className="heading1 mb-[72px] flex justify-center font-bold">
          為什麼要選擇
          <span className="text-primary-500">Panacea</span>
          ？
          <Image className="ml-[5px] translate-y-[-15px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
        <div className="relative flex justify-center">
          <Image
            src="/side-decorate.svg"
            className="absolute left-[-17%] top-[50%] translate-y-[-50%]"
            alt="icon"
            width={278}
            height={390}
          />
          <ul className="flex items-center justify-center rounded-[32px] bg-[#fff] px-[16px] py-[48px]">
            {whyPanacea.map(({ title, description, slogan }, index) => (
              <li
                className="relative flex h-[365px] w-[365px] items-center rounded-full border-[2px] border-[#E5E5E5] px-[80px] [&:nth-child(2)]:mx-[-45px]"
                key={index}
              >
                <div className="flex flex-col gap-[32px]">
                  <h4 className="heading2">{title}</h4>
                  <p className="heading5">{description}</p>
                  <p className="heading6 font-bold text-primary-500">{slogan}</p>
                </div>
              </li>
            ))}
          </ul>
          <Image
            className="absolute right-[-17%] top-[50%] translate-y-[-50%] rotate-180"
            src="/side-decorate.svg"
            alt="icon"
            width={278}
            height={390}
          />
        </div>
      </section>
    </main>
  );
}
