"use client";

import React, { useState } from 'react';
import { 
  MdOutlineLock, 
  MdOutlineSecurity, 
  MdOutlineDevices, 
  MdOutlineVisibility, 
  MdOutlineDeleteForever,
  MdArrowForward
} from 'react-icons/md';
import { IoChevronBack } from 'react-icons/io5';
import Link from 'next/link';

const SecuritySettings = () => {
  // 1. حالة تفعيل المصادقة الثنائية (Two-Factor Authentication)
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  // 2. دالة التبديل
  const toggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  return (
    <div className="min-h-screen   flex flex-col items-center  justify-centerpy-10 px-4 my-5" dir="rtl">
      
      {/* Header */}
      <div className="w-full max-w-[93%] mx-auto flex items-center justify-start mb-10">
        <Link href={"/account"} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MdArrowForward size={24} className="text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-800">الأمان والخصوصية</h1>
      </div>

      {/* إعدادات الأمان Section */}
      <div className="w-full max-w-[93%] mx-auto text-right mb-3 px-2">
        <span className="text-lg text-gray-400 font-medium">إعدادات الأمان</span>
      </div>

      <div className="w-full max-w-[93%] mx-auto bg-white rounded-[24px] shadow-sm border border-gray-50 overflow-hidden mb-8">
        {/* تغيير كلمة المرور */}
        <div className="flex items-center justify-between p-5 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4 text-right">
            <div className="w-10 h-10 bg-[#ECFDF5] text-[#34A853] rounded-xl flex items-center justify-center">
              <MdOutlineLock size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-md">تغيير كلمة المرور</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">آخر تغيير منذ ٣ أشهر</p>
            </div>
          </div>
          <IoChevronBack size={16} className="text-gray-300" />
        </div>

        {/* المصادقة الثنائية - الجزء المطلوب تفعيله */}
        <div className="flex items-center justify-between p-5 border-b border-gray-50">
          <div className="flex items-center gap-4 text-right">
            <div className="w-10 h-10 bg-[#ECFDF5] text-[#34A853] rounded-xl flex items-center justify-center">
              <MdOutlineSecurity size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-md">المصادقة الثنائية</h4>
              <p className="text-[12px] text-gray-400 mt-0.5">تأمين حسابك بخطوتين</p>
            </div>
          </div>
          {/* Toggle Switch */}
          <button 
            onClick={toggle2FA}
            className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
              is2FAEnabled ? 'bg-[#34A853]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                is2FAEnabled ? 'translate-x-[-24px]' : 'translate-x-[-4px]'
              }`}
            />
          </button>
          
        </div>

        {/* إدارة الأجهزة المسجلة */}
        <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4 text-right">
            <div className="w-10 h-10 bg-[#ECFDF5] text-[#34A853] rounded-xl flex items-center justify-center">
              <MdOutlineDevices size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-md">إدارة الأجهزة المسجلة</h4>
              <p className="text-[12px] text-gray-400 mt-0.5">الأجهزة النشطة حاليًا: ٢</p>
            </div>
          </div>
          <IoChevronBack size={16} className="text-gray-300" />
        </div>
      </div>

      {/* إعدادات الخصوصية Section */}
      <div className="w-full max-w-[93%] mx-auto text-right mb-3 px-2">
        <span className="text-lg text-gray-400 font-medium">إعدادات الخصوصية</span>
      </div>

      <div className="w-full max-w-[93%] mx-auto bg-white rounded-[24px] shadow-sm border border-gray-50 overflow-hidden mb-12">
        <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4 text-right">
            <div className="w-10 h-10 bg-[#ECFDF5] text-[#34A853] rounded-xl flex items-center justify-center">
              <MdOutlineVisibility size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-md">من يمكنه رؤية فصيلة دمي</h4>
              <p className="text-[12px] text-[#34A853] font-bold mt-0.5">الجميع</p>
            </div>
          </div>
          <IoChevronBack size={16} className="text-gray-300" />
        </div>
      </div>

      {/* حذف الحساب */}
      <button className="w-full max-w-[93%] mx-auto bg-[#FEF2F2] text-[#EF4444] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all mb-4">
        <MdOutlineDeleteForever size={22} />
        حذف الحساب
      </button>

      <p className="text-[12px] mb-5 text-gray-400 text-center max-w-[300px] leading-relaxed">
        بمجرد حذف الحساب، لن تتمكن من استعادة بياناتك أو سجل التبرعات الخاص بك.
      </p>
      
    </div>
  );
};

export default SecuritySettings;