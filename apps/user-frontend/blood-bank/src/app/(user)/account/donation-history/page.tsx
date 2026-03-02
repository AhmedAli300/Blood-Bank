"use client";

import React, { useState } from 'react';
import { IoChevronBack, IoTimeOutline } from 'react-icons/io5';
import { MdOutlineDateRange, MdOutlineBloodtype, MdVisibility } from 'react-icons/md';
import { HiOutlineChevronDown } from 'react-icons/hi';
import Link from 'next/link';
import { number } from 'zod';

const DonationHistory = () => {
  const donations = [
    {
      id: 1,
      hospital: "بنك دم المركز القومي",
      date: "15 أكتوبر 2023",
      amount: "450 مل (كيس واحد)",
      status: "مكتمل",
      active: true,
    },
    {
      id: 2,
      hospital: "مستشفى القصر العيني",
      date: "12 يونيو 2023",
      amount: "450 مل (كيس واحد)",
      status: "مكتمل",
      active: true,
    },
    {
      id: 3,
      hospital: "بنك دم الدقي",
      date: "05 فبراير 2023",
      amount: "450 مل (كيس واحد)",
      status: "مكتمل",
      active: true,
    },
    {
      id: 4,
      hospital: "بنك دم الهلال الأحمر",
      date: "20 سبتمبر 2022",
      amount: "",
      status: "2022",
      active: false,
    },
    {
      id: 5,
      hospital: "مستشفى القصر العيني",
      date: "12 يونيو 2023",
      amount: "450 مل (كيس واحد)",
      status: "مكتمل",
      active: true,
    },
    {
      id: 6,
      hospital: "بنك دم الدقي",
      date: "05 فبراير 2023",
      amount: "450 مل (كيس واحد)",
      status: "مكتمل",
      active: true,
    },
    {
      id: 7,
      hospital: "بنك دم الهلال الأحمر",
      date: "20 سبتمبر 2022",
      amount: "",
      status: "2022",
      active: false,
    },
  ];

// 2. حالة للتحكم في عدد العناصر المعروضة (نبدأ بـ 3 مثلاً)
  const [visibleCount, setVisibleCount] = useState(3);

  // 3. دالة لزيادة العدد عند الضغط
  const loadMore = () => {
    setVisibleCount(prev => prev + 3); // يضيف 3 سجلات إضافية في كل ضغطة
  };

  // تحديد هل انتهت السجلات أم لا لإخفاء الزر
  const hasMore = visibleCount < donations.length;
  
  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 flex justify-center" dir="rtl">
      <div className="w-full max-w-[92%]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <IoTimeOutline size={24} className="text-emerald-600" />
            <h1 className="text-xl font-bold text-gray-800">سجل تاريخ التبرع</h1>
          </div>
          <Link href={"/account"} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
            <span className="text-sm">العودة</span>
            <IoChevronBack size={18} />
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 text-center">
            <p className="text-gray-400 text-xs mb-2">إجمالي التبرعات</p>
            <span className="text-4xl font-black text-emerald-600">8</span>
          </div>
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 text-center">
            <p className="text-gray-400 text-xs mb-2">آخر تبرع</p>
            <span className="text-xl font-bold text-gray-800">منذ 3 أشهر</span>
          </div>
        </div>

        {/* Timeline & Records */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute right-4 top-0 bottom-0 w-[2px] bg-gray-100 z-0"></div>

          <div className="space-y-6">
            {donations.slice(0, visibleCount).map((item) => (
              <div key={item.id} className="relative pr-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`absolute right-0 top-1/7 -translate-y-1/2 w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-sm ${
                  item.active ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {item.active ? <MdOutlineBloodtype size={18} /> : <IoTimeOutline size={18} />}
                </div>

                <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-50 flex justify-between items-center group hover:shadow-md transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">{item.hospital}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        item.active ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <MdOutlineDateRange size={14} />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                  {item.active && (
                    <button className="px-4 py-2 border border-gray-100 rounded-full text-xs text-gray-500 hover:bg-gray-50 transition-colors">
                      التفاصيل
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. زر التحميل يظهر فقط إذا كان هناك مزيد من البيانات */}
        {hasMore ? (
          <button 
            onClick={loadMore}
            className="w-full mt-10 bg-emerald-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-800 shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]"
          >
            <HiOutlineChevronDown size={20} />
            تحميل المزيد من السجلات
          </button>
        ) : (
          <p className="text-center text-gray-400 text-sm mt-10 italic">لقد وصلت لنهاية السجل</p>
        )}
           

      </div>
    </div>
  );
};

export default DonationHistory;