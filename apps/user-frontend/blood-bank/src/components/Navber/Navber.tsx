"use client"; // ضروري عشان هنستخدم روابط وتفاعلات

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineBloodtype } from "react-icons/md";
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5"; // أيقونة الإشعارات
import { MdOutlineKeyboardArrowDown } from "react-icons/md"; // أيقونة السهم لأسفل
const list = [
    {title: "الرئيسية" , path: 'home'},
    {title: "طلب دم" , path: 'urgent-request'},
    {title: "الخريطة" , path: 'map'},
    {title: "السجل" , path: 'sava'},
]

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
  
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
       
        <div className="logo flex items-center justify-center gap-2">
            <span className="text-3xl bg-[#338e5b] text-white p-1 rounded-xl"><MdOutlineBloodtype /></span>
            <h1 className="font-bold text-2xl ">بنك الدم المصري </h1>
        </div>
          {/* روابط التنقل في المنتصف */}
          <div className="hidden md:flex  space-x-8">
            {list.map((item , index) => 
            <Link key={index} href={item.path} className="relative font-bold text-gray-600 hover:text-[#338e5b] transition-colors group py-2">
              {item.title}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#338e5b] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            )}
          </div>


          {/* أزرار التحكم على اليسار */}
            <div className="flex items-center gap-3 ">
      
      {/* 1. قسم الإشعارات */}
      <div className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-all">
        <IoNotificationsOutline className="text-2xl text-gray-500" />
        {/* النقطة الحمراء للتنبيه */}
        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
      </div>

      {/* 2. الفاصل الرأسي الرفيع */}
      <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>

      {/* 3. بيانات المستخدم */}
      <div className="flex items-center gap-2 cursor-pointer group px-2 py-1 rounded-lg ">
        <div className="text-right flex flex-col justify-center">
          <span className="text-[10px] text-gray-400 leading-tight">مرحباً بك،</span>
          <span className="text-sm font-bold text-gray-700 leading-tight">أحمد</span>
        </div>
        
        {/* الصورة الشخصية */}
        <div className="relative w-9 h-9">
          <Image
            src="/images/images.jpg" // تأكد من وجود صورة بهذا الاسم في فولدر public
            alt="user"
            width={36}
            height={36}
            className="rounded-full border border-gray-200 object-cover"
          />
          {/* نقطة الحالة الخضراء */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

      </div>
    </div>
           
          </div>

        </div>
    </nav>
  );
};

export default Navbar;