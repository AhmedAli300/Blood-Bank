import React from 'react';
import Link from 'next/link';
import { IoCheckmarkSharp } from "react-icons/io5"; // أيقونة الصح
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"; // أيقونة السهم

export default function SuccessCard() {

// const SuccessCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8fafa] p-6 font-sans">
      {/* البطاقة البيضاء */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] p-10 max-w-[450px] w-full text-center border border-gray-50">
        
        {/* الدائرة الخضراء والأيقونة */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            {/* الدائرة الخلفية الباهتة */}
            <div className="absolute inset-0 bg-[#e8f5e9] rounded-full scale-[1.4] transform opacity-60"></div>
            
            {/* الدائرة الرئيسية */}
            <div className="relative bg-[#2d8a5c] w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
              <IoCheckmarkSharp className="text-white text-4xl" />
            </div>
          </div>
        </div>

        {/* العناوين */}
        <h2 className="text-[28px] font-bold text-[#1a1a1a] mb-5 tracking-tight">
          تم تغيير كلمة المرور بنجاح!
        </h2>
        
        <p className="text-[#7d7d7d] text-lg leading-[1.6] mb-12 px-4">
          لقد تم تحديث بياناتك بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة الخاصة بك للوصول إلى حسابك.
        </p>

        {/* زر العودة */}
        <Link 
          href="/login" 
          className="group bg-[#2d8a5c] hover:bg-[#246e4a] text-white font-bold py-4 px-8 rounded-2xl w-full flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98]"
        >
          <span className="text-xl">العودة لتسجيل الدخول</span>
          <HiOutlineArrowNarrowLeft className="text-2xl transition-transform group-hover:-translate-x-1" />
        </Link>

        {/* الفوتر الصغير */}
        <div className="mt-16 pt-4 border-t border-gray-50">
          <p className="text-[#b0b0b0] text-sm">
            نظام إدارة بنوك الدم - جمهورية مصر العربية
          </p>
        </div>
      </div>
    </div>
  );
};

// export default SuccessCard;