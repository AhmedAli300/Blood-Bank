import Link from 'next/link';
import React from 'react';
// استيراد الأيقونات
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';
import { HiOutlineLogin } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
import { MdOutlineBloodtype } from 'react-icons/md';
// import { Link } from 'next/link';

export default function resetAccountPassword() {
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
            <Link href={"login"} className="flex-1 text-center pb-4 text-[#2D8A56] font-bold border-b-2 border-[#2D8A56] transition-all">
               إعادة تعين كلمة المرور
            </Link>
            <Link href={"register"} className="flex-1 text-center pb-4 text-gray-300 hover:text-gray-500 transition-all">
              إنشاء حساب
            </Link>
          </div>
<div className="text-center">

          <h4 className='font-bold text-2xl'>تعين كلمة مرور جديدة</h4>
          <p className='mt-1 font-bold text-gray-500'>يرجي تأكيد كلمة مرور جديدة وتأكيدها للمتابعة</p>
</div>

          <form className="space-y-6">
            {/* البريد الإلكتروني */}
            {/* <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 mr-1">البريد الإلكتروني</label>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="example@mail.com" 
                  className="w-full p-2 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none transition-all" 
                />
                <BiEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
              </div>
            </div> */}

            {/* كلمة المرور */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 mr-1">كلمة المرور الجديدة</label>
              <div className="relative group">
                <input 
                  type="password" 
                  placeholder="********" 
                  className="w-full p-2 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none transition-all" 
                />
                <BiLockAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 mr-1">تأكيد كلمة المرور الجديدة</label>
              <div className="relative group">
                <input 
                  type="password" 
                  placeholder="********" 
                  className="w-full p-2 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none transition-all" 
                />
                <BiLockAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
              </div>
            </div>

            {/* روابط إضافية (تذكرني + نسيت كلمة المرور) */}
            {/* <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-[#2D8A56] focus:ring-[#2D8A56]" />
                <label htmlFor="remember" className="text-xs text-gray-400 font-medium cursor-pointer">تذكرني</label>
              </div>
              <Link href="forgetPassword" className="text-xs text-[#2D8A56] font-bold hover:underline">هل نسيت كلمة المرور؟</Link>
            </div> */}

            {/* زر تسجيل الدخول */}
            <Link href={"successCard"} className="w-full bg-[#2D8A56] hover:bg-[#256f45] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/10 group">
               تحديث كلمة المرور
              <HiOutlineLogin className="text-xl rotate-180 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </form>
            <Link href={"login"} className='text-center w-full text-[#2D8A56] font-bold flex items-center justify-center mt-2'><IoIosArrowBack className='font-bold'/>العودة لتسجيل الدخول</Link>
        </div>
      </div>
    </div>
  );
}