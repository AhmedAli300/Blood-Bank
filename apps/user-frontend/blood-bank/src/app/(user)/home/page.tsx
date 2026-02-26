import Image from "next/image";
import Link from "next/link";
import { FaStarOfLife } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

const khadma = [
  {
    icon: <FaStarOfLife />,
    title: 'طلب دم عاجل ',
    desc: 'تقديم طلب فوري للمريض في حالات الطوارئ',
    rul : "urgent-request"
  },
  {
    icon: <FaClockRotateLeft />,
    title: 'متابعة حالة الطلبات',
    desc: 'تتبع مسار طلباتك الحالية وتاريخ تبرعاتك',
    rul : "urgent-request"
  }
]
export default function UserHome() {
  return (
    <div className="xl:max-w-[94%] mx-auto p-6 space-y-10 dir-rtl text-right">
      
      {/* 1. الـ Banner الرئيسي */}
      <div className="relative h-62.5 w-full rounded-3xl overflow-hidden shadow-xl">
        <Image 
          src="/images/blood-bag-bg.jpg" // الصورة اللي في الـ public
          alt="تبرع بالدم" 
          fill 
          className="object-cover brightness-50" 
        />
        <div className="absolute inset-0 bg-black flex flex-col justify-center text-white  p-6 space-y-4">
          <span className="bg-[#338E5B] text-xs px-3 py-1 rounded-full font-bold w-fit">حملة وطنية للتبرع</span>
          <h2 className="text-4xl font-bold">تبرع بالدم، أنقذ حياة</h2>
          <p className="max-w-md opacity-90">مساهمتك البسيطة قد تكون هي الأمل الوحيد لإنقاذ حياة مريض في حاجة ماسة.</p>
          <button className="bg-[#338E5B] w-fit text-white px-10 py-2 rounded-xl font-bold hover:scale-105 transition-transform ">
            ابدأ الآن
          </button>
        </div>
      </div>

      {/* 2. قسم الخدمات السريعة */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 border-r-4 border-[#338E5B] pr-3 mb-6 italic"> خدمات سريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {khadma.map((item , index) => 
             <Link href={item.rul} key={index} className={` ${index % 2 === 0 ? "bg-[#338E5B]" : "bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-black"}  p-6 rounded-2xl text-white flex justify-between items-center group cursor-pointer`}>
             <div className="text-right flex gap-4">
             <div className={`w-12 h-12  rounded-xl flex items-center justify-center text-lg font-bold italic ${index % 2 === 0 ? "bg-white/20" : " bg-[#FDF2ED] text-[#E67E22]"}`}>{item.icon}</div>
                <div className="">
                <h4 className={`text-lg font-bold  ${index % 2 === 0 ? "text-white" : "text-black"} `}> {item.title} </h4>
                <p className={`text-sm opacity-80 ${index % 2 === 0 ? "text-white" : "text-black"}`}>{item.desc}</p>

                </div>
             </div>
             <span className={`text-2xl ${index % 2 === 0 ? "text-white" : "text-black"}`}><IoIosArrowBack /></span>
          </Link>
          )}
          {/* كارت طلب دم عاجل */}
          {/* <div className="bg-[#338E5B] p-6 rounded-2xl text-white flex justify-between items-center group cursor-pointer">
             <div className="text-right flex gap-4">
             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-lg font-bold italic"><FaStarOfLife /></div>
                <div className="">
                <h4 className="text-lg font-bold">طلب دم عاجل</h4>
                <p className="text-sm opacity-80">تقديم طلب فوري للمريض في حالات الطوارئ</p>

                </div>
             </div>
             <span className="text-2xl"><IoIosArrowBack /></span>
          </div> */}

          {/* كارت متابعة حالة الطلبات */}
          {/* <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center group cursor-pointer hover:shadow-md transition-shadow">
             <div className="w-12 h-12 bg-[#FDF2ED] text-[#E67E22] rounded-xl flex items-center justify-center text-xl"><FaClockRotateLeft /></div>
             <div className="text-right text-gray-800">
                <h4 className="text-lg font-bold">متابعة حالة الطلبات</h4>
                <p className="text-sm text-gray-400">تتبع مسار طلباتك الحالية وتاريخ تبرعاتك</p>
             </div>
             <span className="text-2xl text-gray-300">{"<"}</span>
          </div> */}
        </div>
      </div>

    </div>
  );
}