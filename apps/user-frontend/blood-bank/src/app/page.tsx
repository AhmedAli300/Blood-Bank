import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineBloodtype } from "react-icons/md";

const footer = [
  {number: +500 , name: "مستشفي"},
  {number: "+100ألف" , name: "متبرع نشط"},
  {number: "27" , name: "محافظة"}
]

export default function Home() {
  return (<>
  <nav className="bg-[#FDFEFD] shadow border-b border-b-black/10   h-16 flex items-center px-10 sm:px-20 md:px-40 ">
    <div className="logo flex items-center justify-center gap-2">
      <span className="text-3xl bg-[#e9f2ed] text-[#338e5b] p-1 rounded-xl"><MdOutlineBloodtype /></span>
      <h1 className="font-bold text-2xl ">بنك الدم المصري </h1>
    </div>
  </nav>

<section className=" bg-[#f8fcf9] flex flex-col-reverse lg:flex-row lg:items-center justify-between p-8 gap-10 h-[89.7vh] px-10 sm:px-20 md:px-40 ">
  
  <div className="flex-1 text-start justify-center items-start flex flex-col " >
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mb-4 inline-block">● نظام رقمي متكامل</span>
    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">نظام إدارة  <span className="text-[#338e5b] "> بنوك الدم</span> <br/> في مصر</h1>
    <p className="text-green-600 text-2xl mb-4 font-bold">شريان الحياة لكل مصري</p>
    <p className="text-gray-500 mb-8 max-w-lg text-lg"> منصة موحدة ذكية لربط المتبرعين بالمحتاجين والمستشفيات في جميع أنحاء الجمهورية . ساهم في إنقاذ حياة اليوم بخطوات بسيطة أمنه وموثقة</p>
    
    <div className="flex  gap-4 pb-5 border-b border-b-black/10 w-full">
      <Link href={"/register"} className="bg-green-600 text-white px-5 md:px-8 py-2 rounded-lg font-bold  flex items-center justify-center gap-2">
        ابدأ الآن <FaArrowLeft />

      </Link>
      <button className="text-green-600 border border-green-600 px-5 md:px-8 py-3 rounded-lg font-bold">
        تعرف على المزيد
      </button>
    </div>
    <div className="number flex mt-3  items-center justify-between w-full">
      {footer.map((item , index) => 
      <div className="one" key={index}>
        <h3 className="font-bold text-xl ">{item.number}</h3>
        <p className="text-black/40">{item.name}</p>
      </div>
      )}
    </div>
  </div>

  {/* الجزء الخاص بالصورة (سيكون على اليسار) */}
  <div className="flex-1 relative hidden lg:flex">
        <Image 
        src="/images/Gemini_Generated_Image_ukhewaukhewaukhe.png" 
        alt="طبيب بنك الدم"
        width={500}  
        height={500} 
        priority     
      />
    {/* البطاقات الطائرة (Floating Cards) */}
    <div className="absolute top-0 right-0 bg-white p-2 shadow-lg rounded-xl flex items-center gap-3 px-4    translate-x-[15%] -translate-y-[50%] transform">
        <FaRegHeart className="text-green-600 text-xl"/>
      <div className="">
        <p className="text-black/35 text-sm">فصيلة نادرة</p>
        <h3 className="font-bold text-sm">5-مطلوب حالاً</h3>
      </div>
    </div>
    <div className="absolute bottom-10 left-0 bg-white p-2 shadow-lg rounded-xl flex items-center gap-3 px-4    -translate-x-[25%] translate-y-[50%] transform">
      <IoShieldCheckmarkOutline  className="text-green-600 text-xl"/>
      <div className="">
        <p className="text-black/35 text-sm"> حالة التبرع</p>
        <h3 className="font-bold text-sm">تمت بنجاح</h3>
      </div>
    </div>
  </div>

</section>
  {/* <main className="px-40 bg-[#f8fcf9]">
    
  </main> */}
  </>
  );
}
