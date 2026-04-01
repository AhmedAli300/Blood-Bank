"use client";
import React, { useState } from "react";
// استيراد الأيقونات المطلوبة
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { BsDropletHalf } from "react-icons/bs";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-sans" dir="rtl">
      {/* الكارت الرئيسي */}
      <div className="w-full sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] bg-white rounded-[30px] shadow-sm overflow-hidden border border-gray-100">
        
        {/* الجزء العلوي الأزرق */}
        <div className="bg-[#3B71F3] p-4 text-white text-center flex flex-col items-center gap-2">
          <div className="bg-white/20 p-2 rounded-full mb-2">
            <div className="bg-white rounded-full p-2 text-[#3B71F3]">
               <BsDropletHalf size={24} fill="currentColor" />
            </div>
          </div>
          <p className="text-[16px] opacity-90">مرحباً بك مجدداً</p>
          <h1 className="text-lg md:text-3xl font-bold">نظام إدارة بنوك الدم</h1>
        </div>

        {/* محتوى الفورم */}
        <div className="p-8 flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">تسجيل دخول الموظفين</h2>
            <p className="text-gray-400 text-sm md:text-md mt-1">الرجاء إدخال بياناتك للمتابعة</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* حقل البريد الإلكتروني */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-bold text-gray-700 mr-1">البريد الإلكتروني</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="example@bloodbank.eg"
                  className="w-full p-2 pr-11 text-xl flex items-center bg-[#F8FAFF] border border-gray-100 rounded-2xl  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <MdOutlineEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={28} />
              </div>
            </div>

            {/* حقل كلمة المرور */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 mr-1">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full p-2 pr-4 pl-12 text-xl flex items-center bg-[#F8FAFF] border border-gray-100 rounded-2xl  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 cursor-pointer top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={26} />
                  ) : (
                    <IoEyeOutline size={26} />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-center mt-1">
                <a href="#" className="text-xs text-blue-600 font-bold hover:underline">نسيت كلمة المرور؟</a>
              </div>
            </div>

            {/* زر تسجيل الدخول */}
            <Link href={"/home"} className="w-full flex items-center justify-center py-2 text-xl cursor-pointer bg-[#3B71F3] text-white rounded-2xl font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all mt-">
              تسجيل الدخول
            </Link>
          </form>
        </div>
      </div>

      {/* الجزء السفلي (الدعم الفني) */}
      <div className="mt-8 text-center flex flex-col items-center gap-2">
        <p className="text-gray-500 text-sm font-bold">هل تواجه مشكلة في الدخول ؟</p>
        <button className="text-2xl flex items-center gap-2 text-blue-600 font-bold cursor-pointer hover:text-blue-700 transition-colors">
          <span>تواصل مع الدعم الفني</span>
          <BiSupport size={20} />
        </button>
      </div>
    </div>
  );
}