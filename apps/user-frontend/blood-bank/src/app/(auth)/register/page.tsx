"use client";
import React, { useState } from 'react';
import PhoneInput, { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Link from 'next/link';
// استيراد الأيقونات المطلوبة
import { BiUser, BiIdCard, BiPhone, BiEnvelope, BiLockAlt, BiMap } from 'react-icons/bi';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { MdOutlineBloodtype } from 'react-icons/md';
const egyptianGovernorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "دمياط", "جنوب سيناء", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "شمال سيناء", "سوهاج", "بني سويف", "بورسعيد", "أسوان", "أسيوط"
];
export default function RegisterPage() {
const [value, setValue] = useState<Value | undefined>();  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans" dir="rtl">
      <div className="bg-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-5xl w-full border border-gray-100">
        
        {/* الجانب الأخضر (اليمين) */}
        <div className="md:w-[40%] bg-[#2D8A56] p-10 text-white flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20">
            <MdOutlineBloodtype className="text-5xl text-white animate-pulse" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">بنك الدم المصري</h1>
            <p className="text-xl font-light opacity-90">شارك الحياة، تبرع بالدم</p>
          </div>
          <p className="text-sm opacity-70 leading-relaxed max-w-[250px]">
            نظام إدارة متطور يربط بين المتبرعين والمحتاجين بكفاءة وأمان عاليين.
          </p>
        </div>

        {/* جانب الفورم (الشمال) */}
        <div className="md:w-[60%] p-8 md:p-14 md:py-8 bg-white">
          {/* التبويبات */}
          <div className="flex border-b border-gray-100 mb-4 relative">
            <Link href={"register"} className="flex-1 pb-4 text-center text-[#2D8A56] font-bold border-b-2 border-[#2D8A56] transition-all">
              إنشاء حساب
            </Link>
            <Link href={"login"} className="flex-1 text-center pb-4 text-gray-400 hover:text-gray-600 transition-all">
              تسجيل الدخول
            </Link>
          </div>

          <form className="space-y-3">
            {/* الاسم الرباعي */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 mr-1">الاسم الرباعي</label>
              <div className="relative group">
                <input type="text" placeholder="محمد أحمد محمود علي" className="w-full p-2 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none transition-all placeholder:text-gray-300" />
                <BiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
              </div>
            </div>

            {/* الرقم القومي */}
            {/* <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 mr-1">الرقم القومي (14 رقم)</label>
              <div className="relative group">
                <input type="text" placeholder="29901010000000" className="w-full p-3.5 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none transition-all placeholder:text-gray-300" />
                <BiIdCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
              </div>
            </div> */}

            {/* الهاتف والمحافظة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 mr-1">المحافظة</label>
                <div className="relative group">
                  <select className="w-full p-2 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none appearance-none text-gray-400 ">
                    <option>اختر المحافظة...</option>
                    {egyptianGovernorates.map((gov) => (
          <option key={gov} value={gov}>
            {gov}
          </option>
        ))}
                  </select>
                  <BiMap className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
                </div>
              </div>
              <div className="space-y-1">
  <label className="text-xs font-bold text-gray-500 mr-1">رقم الهاتف</label>
  <div className="relative phone-container">
    <PhoneInput
    international
      placeholder="01x xxxx xxxx"
      defaultCountry="EG" // جعل مصر هي الدولة الافتراضية
      value={value}
      maxLength={15}
      onChange={setValue}
      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl focus-within:ring-2 focus-within:ring-[#2D8A56]/20 focus-within:border-[#2D8A56] outline-none transition-all flex dir-ltr"
    />
  </div>
</div>
              
              {/* <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 mr-1">رقم الهاتف</label>
                <div className="relative group">
                  <input type="tel" placeholder="01xxxxxxxxx" className="w-full p-2 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none transition-all placeholder:text-gray-300" />
                  <BiPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
                </div>
              </div> */}
            </div>

            {/* البريد الإلكتروني */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 mr-1">البريد الإلكتروني</label>
              <div className="relative group">
                <input type="email" placeholder="name@example.com" className="w-full p-2 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none transition-all placeholder:text-gray-300" />
                <BiEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
              </div>
            </div>

            {/* الباسورد */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 mr-1">كلمة المرور</label>
                <div className="relative group">
                  <input type="password" placeholder="********" className="w-full p-2 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none transition-all" />
                  <BiLockAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 mr-1">تأكيد كلمة المرور</label>
                <div className="relative group">
                  <input type="password" placeholder="********" className="w-full p-2 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D8A56]/20 focus:border-[#2D8A56] outline-none transition-all" />
                  <BiLockAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <input id="terms-checkbox" type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2D8A56] focus:ring-[#2D8A56]" />
              <label htmlFor="terms-checkbox"  className="text-xs font-bold text-[#2D8A56] cursor-pointer hover:underline">
                أوافق على الشروط والأحكام و سياسة الخصوصية
              </label>
            </div>

            {/* زر الإرسال */}
            <button className="w-full bg-[#2D8A56] hover:bg-[#256f45] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/10 group">
              إنشاء الحساب
              <HiOutlineArrowNarrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-400 mt-8">
            © 2026 نظام إدارة بنوك الدم في مصر. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
}