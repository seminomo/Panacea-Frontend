import Image from "next/image";
import bg from '../public/bg-search.svg';

interface LandingOption {
  title: string;
  description: string,
  img?: string,
  url?: string;
  sidebar?: string,
  slogan?:string,
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
    description: '購買課程後，可以在教練行事曆上選擇有空的時間預約。預約成功後，會收到成功通知，並將課程加入學員的行事曆中。',
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
]

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
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section 
      style={{ backgroundImage: `url(${bg.src})` }} 
      className="w-full h-[640px] bg-cover flex items-center justify-center gap-[130px] mb-[80px] pt-[95px]"
      >
        <div>
          <div className="mb-[40px]">
            <h2 className="heading1 font-bold">尋找最適合你的課程</h2>
            <span className="heading6">讓我們陪著你尋找答案</span>
          </div>
          
          <div className="relative">
            <input
              type="text"
              className="w-full p-[18px] rounded-[80px] border-[2px] border-primary-500"
              placeholder="請輸入想尋找的課程"
            />
            <button className="flex bg-primary-500 px-[16px] py-[8px] rounded-[80px] items-center absolute right-[8px] top-[50%] translate-y-[-50%]">
              <Image className="mr-[8px]" src="/icon-search.svg" alt="icon" width={20} height={20} />
              <span className="body text-[#fafafa]">搜尋</span>
            </button>
          </div>
        </div>
        <Image src="/web-search.svg" alt="icon" width={525} height={410} />
      </section>
      <section className="mb-[80px]">
        <h3 className="heading1 font-bold flex mb-[72px] justify-center">
          熱門
          <span className="text-primary-500">課程</span>
          <Image className=" translate-y-[-15px] ml-[5px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
        <Image src="/test.png" alt="icon" width={1296} height={640} />
      </section>
      <section className="mb-[80px]">
        <h3 className="heading1 font-bold flex mb-[72px] justify-center">
          尋找最適合你的
          <span className="text-primary-500">課程</span>
          <Image className="translate-y-[-15px] ml-[5px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
        <ul className="flex flex-col gap-[40px]">
          {
            searchCourse.map(({ title, description, sidebar }, index) => (
              <li 
                className="pt-[100px] pb-[80px] gap-[25px] rounded-[120px] flex items-center justify-center w-[1296px] even:flex-row-reverse"
                key={index} 
                style={{ background: index % 2 ? 'linear-gradient(90deg, rgba(23, 127, 172, 0) 0%, rgba(23, 127, 172, 0.1) 100%)' : 'linear-gradient(90deg, rgba(23, 127, 172, 0.1) 0%, rgba(23, 127, 172, 0) 100%)'}}
              >
                <div className="flex items-start justify-center gap-[24px]">
                  <Image src="landing-arrow.svg" alt="icon" width={48} height={48} className="translate-y-[-10px]" />
                  <div className="max-w-[533px]">
                    <h4 className="heading2 mb-[32px]">{title}</h4>
                    <p className="heading5">{description}</p>
                  </div>
                </div>
                <Image src="/test.png" alt="icon" width={416} height={215} />
                <p className="underline heading3 underline-offset-[8px] ml-[24px] translate-y-[-80px]" style={{ writingMode: 'vertical-lr' }}>{sidebar}</p>
              </li>
            ))
          }
        </ul>
      </section>
      <section className="relative mb-[80px] bg-[#BCE3FA33] w-full pt-[120px] pb-[200px] flex flex-col justify-center items-center">
        <Image className="absolute left-0 top-[300px]" src="/left-icon.svg" alt="icon" width={200} height={790} />
        <Image className="absolute right-0 bottom-[10px]" src="/right-icon.svg" alt="icon" width={250} height={900} />
        <h3 className="heading1 font-bold flex justify-center mb-[72px]">
          成為 Panacea 的
          <span className="text-primary-500">線上教練</span>
          <Image className=" translate-y-[-15px] ml-[5px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
        <ul className="rounded-[32px] px-[16px] py-[48px] w-[1296px] bg-[#fff] flex flex-col ">
          {
            coachSteps.map(({ title, description, img }, index) => (
              <li 
                className="relative flex items-center [&:nth-child(2)]:border-b [&:nth-child(1)]:border-b border-dashed border-[#BCE3FA] py-[48px] px-[94px]"
                key={index} 
              >
                <Image src="/test.png" alt="icon"  width={525} height={320} />
                <div className="flex flex-col gap-[32px] px-[48px] w-[526px]">
                  <div className="heading3 px-[36px] py-[8px] bg-second-400 rounded-[40px] w-[175px] text-center">Step{index + 1}</div>
                  <h4 className="heading2">{title}</h4>
                  <p className="heading5">{description}</p>
                </div>
              {
                index !== 2 ? <Image className="absolute right-1/2 bottom-[-24px] translate-x-1/2" src="/down-arrow.svg" alt="icon" width={48} height={48}/> : ''
              }
              </li>
            ))
          }
        </ul>
      </section>
      <section className="mb-[80px]">
        <h3 className="heading1 font-bold flex mb-[72px] justify-center">
          為什麼要選擇
          <span className="text-primary-500">Panacea</span>
          ？
          <Image className=" translate-y-[-15px] ml-[5px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
        <div className="flex justify-center">
          <Image src="/side-decorate.svg" alt="icon" width={278} height={390} />
          <ul className="rounded-[32px] px-[16px] py-[48px] bg-[#fff] flex items-center justify-center">
            {
              whyPanacea.map(({ title, description, slogan }, index) => (
                <li 
                  className="relative flex items-center px-[80px]  border-[2px] [&:nth-child(2)]:mx-[-45px] border-[#E5E5E5] rounded-full h-[465px] w-[465px]"
                  key={index}
                >
                  <div className="flex flex-col gap-[32px]">
                    <h4 className="heading2">{title}</h4>
                    <p className="heading5">{description}</p>
                    <p className="heading6 text-primary-500 font-bold">{slogan}</p>
                  </div>
                </li>
              ))
            }
          </ul>
          <Image className=" rotate-180" src="/side-decorate.svg" alt="icon" width={278} height={390} />
        </div>
      </section>
    </main>
  );
}
