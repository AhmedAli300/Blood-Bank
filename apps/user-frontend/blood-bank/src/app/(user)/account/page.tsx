"use client"; // ضروري في Next.js (App Router) لاستخدام Hooks

import React, { useState, useRef, ChangeEvent } from 'react';
import { 
  MdOutlinePayments, 
  MdOutlineHistory, 
  MdOutlineNotificationsNone, 
  MdOutlineSecurity, 
  MdOutlineLogout, 
  MdOutlineCameraAlt 
} from 'react-icons/md';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { IoChevronBack } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  urle: string; // تأكد أنها ليست url?: string
}

const ProfilePage = () => {
  // 1. حالة لتخزين الصورة المختارة
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // 2. مرجع للـ input المخفي
  const fileInputRef = useRef<HTMLInputElement>(null);

  const menuItems: MenuItem[] = [
    { id: 1, title: 'طرق الدفع', urle: "account/payment", icon: <MdOutlinePayments size={24} className="text-[#10B981]" /> },
    { id: 2, title: 'تاريخ التبرع',urle: "account/donation-history", icon: <MdOutlineHistory size={24} className="text-[#10B981]" /> },
    { id: 3, title: 'التنبيهات',urle: "account/alerts", icon: <MdOutlineNotificationsNone size={24} className="text-[#10B981]" /> },
    { id: 4, title: 'الأمان والخصوصية',urle: "account/setting", icon: <MdOutlineSecurity size={24} className="text-[#10B981]" /> },
  ];

  // 3. دالة معالجة اختيار الصورة
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // 4. دالة لفتح نافذة اختيار الملفات عند الضغط على الدائرة
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className=" max-w-[93%] mx-auto  flex flex-col items-center py-10 px-4" dir="rtl">
        <div className="flex max-md:flex-col justify-between w-full items-center gap-3">

      <div className="flex flex-col w-full">

      {/* Input ملف مخفي */}
      <div className="flex gap-4 items-center">

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* منطقة الصورة الشخصية */}
      <div className="relative mb-4 cursor-pointer group" onClick={triggerFileInput}>
        <div className="w-24 h-24 bg-[#E5E1C9] rounded-full border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
          {profileImage ? (
            <Image  
              src={profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover" width={100} height={100}
              
            />
          ) : (
            // شكل افتراضي في حال عدم وجود صورة (نفس لون الصورة الأصلية)
            <div className="w-full h-full bg-[#E5E1C9]"></div>
          )}
        </div>
        
        {/* أيقونة الكاميرا الصغيرة */}
        <div className="absolute bottom-1 right-0 bg-[#34A853] p-1.5 rounded-full border-2 border-white text-white group-hover:scale-110 transition-transform">
          <MdOutlineCameraAlt size={16} />
        </div>
      </div>
<div className="">

      <h2 className="text-xl font-bold text-[#1F2937] mb-1">أحمد محمد</h2>
      <p className="text-gray-400 text-sm mb-6 font-sans" dir="ltr">+20 123 456 7890</p>
</div>
      </div>

      {/* زر تعديل البيانات */}
      <button className="w-full max-w-sm bg-[#ECFDF5] text-[#059669] py-3 rounded-2xl font-semibold mb-10 flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all">
        <HiOutlinePencilAlt size={20} />
        تعديل البيانات
      </button>
      </div>
<div className=" w-full">



      {/* قائمة الخيارات (نفس الكود السابق) */}
      <div className="w-full  text-right mb-3 px-2">
        <span className="text-md text-gray-700 font-bold opacity-70">الإعدادات والخصوصية</span>
      </div>

      <div className="w-full  bg-white rounded-[24px] shadow-sm border border-gray-50 overflow-hidden mb-6">
        {menuItems.map((item, index) => (
          <Link href={item.urle} 
            key={item.id}
            className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors group ${
              index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-[#F0FDF4] rounded-xl flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-[#374151] font-semibold text-[15px]">{item.title}</span>
            </div>
            <IoChevronBack size={18} className="text-gray-300 group-hover:translate-x-[-2px] transition-transform" />
          </Link>
        ))}
      </div>
</div>
        </div>

      {/* زر تسجيل الخروج */}
      <button className="w-full max-w-sm bg-[#FEF2F2] text-[#EF4444] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all">
        <MdOutlineLogout size={22} className="rotate-180" />
        تسجيل الخروج
      </button>
      
    </div>
  );
};

export default ProfilePage;