"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // أضفنا usePathname
import { MdOutlineBloodtype } from "react-icons/md";
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const list = [
    {title: "الرئيسية" , path: '/home'},
    {title: "طلب دم" , path: '/banks'}, // تأكد من إضافة / قبل المسار
    {title: "الخريطة" , path: '/map'},
    {title: "طلباتي" , path: '/my-requests'},
]

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // هذا المتغير يحتوي على المسار الحالي المتواجد فيه المستخدم

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
       
        <div className="logo flex items-center justify-center gap-2">
            <span className="text-3xl bg-[#338e5b] text-white p-1 rounded-xl"><MdOutlineBloodtype /></span>
            <h1 className="font-bold text-2xl ">بنك الدم المصري </h1>
        </div>

          {/* روابط التنقل */}
          <div className="hidden md:flex space-x-8 gap-6">
            {list.map((item, index) => {
              // التحقق هل هذا الرابط هو الصفحة الحالية؟
              const isActive = pathname === item.path;

              return (
                <Link 
                  key={index} 
                  href={item.path} 
                  className={`relative font-bold transition-colors m-0 group py-2 ${
                    isActive ? "text-[#338e5b]" : "text-gray-600 hover:text-[#338e5b]"
                  }`}
                >
                  {item.title}
                  {/* الخط السفلي: يظهر في حالة الهوفر أو إذا كان الرابط نشطاً */}
                  <span className={`absolute bottom-0 right-0 h-0.5 bg-[#338e5b] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              );
            })}
          </div>

          {/* أزرار التحكم */}
          <div className="flex items-center gap-3">
            <Link href={"/notifications"} className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-all">
              <IoNotificationsOutline className="text-2xl text-gray-500" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
            </Link>

            <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>

            <div className="flex items-center gap-2 cursor-pointer group px-2 py-1 rounded-lg">
              <div className="text-right flex flex-col justify-center">
                <span className="text-[10px] text-gray-400 leading-tight">مرحباً بك،</span>
                <span className="text-sm font-bold text-gray-700 leading-tight">أحمد</span>
              </div>
              
              <Link href={"/account"} className="relative w-9 h-9">
                <Image
                  src="/images/images.jpg"
                  alt="user"
                  width={36}
                  height={36}
                  className="rounded-full border border-gray-200 object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;