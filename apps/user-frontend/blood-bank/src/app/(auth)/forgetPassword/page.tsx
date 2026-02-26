import Link from 'next/link';
import React from 'react';
// استيراد الأيقونات
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';
import { HiOutlineLogin } from 'react-icons/hi';
import { MdOutlineBloodtype } from 'react-icons/md';

export default function ForgetPassword() {
  return (
    <div className="min-h-screen bg-[#F0F7F3] flex items-center justify-center p-4 font-sans" dir="rtl">
      <div className="bg-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full border border-gray-100">
        
        {/* الجانب الأيمن (الأخضر) */}
        <div className="md:w-1/3 bg-[#2D8A56] p-10 text-white flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <MdOutlineBloodtype className="text-4xl text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">بنك الدم المصري</h1>
            <p className="text-sm font-light opacity-90">شارك الحياة، تبرع بالدم</p>
          </div>
        </div>

        {/* الجانب الأيسر (الفورم) */}
        <div className="md:w-2/3  p-8 md:p-14 md:py-8 bg-white">
          {/* التبويبات */}
          <div className="flex border-b border-gray-100 mb-10 relative ">
            <Link href={"forgetPassword"} className="flex-1 text-center pb-4 text-[#2D8A56] font-bold border-b-2 border-[#2D8A56] transition-all">
               نسيت كلمة المرور
            </Link>
            <Link href={"register"} className="flex-1 text-center pb-4 text-gray-300 hover:text-gray-500 transition-all">
              إنشاء حساب
            </Link>
          </div>

          <form className="space-y-6">
            {/* البريد الإلكتروني */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 mr-1">أدخل البريد الإلكتروني الخاص بك</label>
              <div className="relative group flex items-center justify-center">
                <input 
                  type="email" 
                  placeholder="example@mail.com" 
                  className="w-full p-2 pr-11 mt-2 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none transition-all" 
                />
                <BiEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
              </div>
            </div>

         

          

            {/* زر تسجيل الدخول */}
            <Link href={"resetPassword"} className="w-full bg-[#2D8A56] hover:bg-[#256f45] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/10 group">
             تأكيد
              {/* <HiOutlineLogin className="text-xl rotate-180 group-hover:-translate-x-1 transition-transform" /> */}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}