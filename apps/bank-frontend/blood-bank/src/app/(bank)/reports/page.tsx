"use client";
import React, { useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import { IoWarningOutline, IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineBloodtype, MdOutlineTransitEnterexit } from "react-icons/md";
import { FaPlusCircle, FaTruck } from "react-icons/fa";

type TimeRange = 'اليوم' | 'هذا الأسبوع' | 'هذا الشهر' | 'مخصص';

export default function ReportsPage() {
  const [activeRange, setActiveRange] = useState<TimeRange>('اليوم');

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-4 md:p-10 font-sans text-right" >
      <div className="max-w-6xl mx-auto">
        
        {/* الهيدر العلوي ونظام التبويبات */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-black text-gray-800">التقارير</h1>
                <p className="text-gray-400 text-sm">نظرة عامة على بنك الدم</p>
            </div>
            
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl">
            {(['اليوم', 'هذا الأسبوع', 'هذا الشهر', 'مخصص'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeRange === range 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                {range}
              </button>
            ))}
          
          </div>

         
        </div>

        {/* تنبيه مخزون منخفض */}
        <div className="bg-red-50 border border-red-100 p-4 py-2 rounded-3xl flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center">
                 <IoWarningOutline size={20} />
              </div>
              <p className="text-red-800 text-sm">
                <span className="font-bold">تنبيه: مخزون منخفض</span>
                <br />
                مخزون فصيلة <span className="font-black">-O</span> وصل للحد الأدنى (3 أكياس)، يرجى مراجعة طلبات التوريد فوراً.
              </p>
           </div>
        </div>

        {/* الإحصائيات السريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white px-5 py-4  rounded-[32px] border border-gray-50 flex justify-between items-center shadow-sm">
             <div className="text-right">
                <p className="text-gray-400 text-sm mb-1 font-bold">إجمالي التبرعات</p>
                <h3 className="text-4xl font-black text-gray-800">1,250</h3>
                <span className="text-green-500 text-[10px] bg-green-50 px-2 py-1 rounded-lg mt-2 inline-block font-bold">📈 5.2%</span>
             </div>
             <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <MdOutlineBloodtype size={28} />
             </div>
          </div>
          
          <div className="bg-white px-5 py-4 rounded-[32px] border border-gray-50 flex justify-between items-center shadow-sm">
             <div className="text-right">
                <p className="text-gray-400 text-sm mb-1 font-bold">إجمالي الصرف</p>
                <h3 className="text-4xl font-black text-gray-800">980</h3>
                <span className="text-purple-500 text-[10px] bg-purple-50 px-2 py-1 rounded-lg mt-2 inline-block font-bold">📉 0%</span>
             </div>
             <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                <MdOutlineTransitEnterexit size={28} />
             </div>
          </div>
        </div>

        {/* التقارير والرسوم البيانية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
             {/* أكثر الفصائل طلباً */}
           <div className="lg:col-span-2 bg-white px-8 py-4 rounded-[32px] shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-5">
                 <h4 className="font-black text-gray-800 text-lg">أكثر الفصائل طلباً</h4>
                 <button className="text-blue-600 text-xs font-bold">عرض التفاصيل</button>
              </div>
              <div className="space-y-5">
                 {[
                   { type: '+A', percent: 45, color: 'bg-blue-600' },
                   { type: '+O', percent: 32, color: 'bg-blue-400' },
                   { type: '+B', percent: 18, color: 'bg-blue-300' },
                 ].map((blood) => (
                   <div key={blood.type} className="flex items-center gap-4">
                      <span className="text-gray-800 font-black text-sm w-8">{blood.type}</span>
                      <div className="flex-1 h-2.5 bg-gray-50 rounded-full relative">
                         <div className={`absolute top-0 bottom-0 right-0 rounded-full ${blood.color}`} style={{ width: `${blood.percent}%` }}></div>
                      </div>
                      <span className="text-gray-400 text-xs w-8">{blood.percent}%</span>
                   </div>
                 ))}
              </div>
           </div>


           {/* تحميل التقرير */}
           <div className="bg-white p-8 rounded-[32px] flex flex-col items-center justify-center text-center shadow-sm border border-gray-50">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                 <IoDocumentTextOutline size={32} />
              </div>
              <h4 className="font-black text-gray-800 mb-2 text-lg">تقرير المخزون الشهري</h4>
              <p className="text-gray-400 text-xs mb-8 px-4">تم تحديث مستويات المخزون لجميع الفصائل.</p>
              <button className="w-full bg-blue-50 text-blue-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-all">
                 تحميل PDF
                 <IoDocumentTextOutline />
              </button>
           </div>

          
        </div>

        {/* آخر العمليات */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
           <h4 className="font-black text-gray-800 text-lg mb-8">آخر العمليات</h4>
           <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#F8F9FD] rounded-[24px]">
                 <div className="bg-green-100 text-green-600 p-3 rounded-2xl">
                    <FaPlusCircle size={20} />
                 </div>
                 <div className="flex-1 px-4 text-right">
                    <h5 className="font-bold text-gray-800">تبرع دم كامل</h5>
                    <p className="text-gray-400 text-[10px]">محمد علي • منذ 15 دقيقة</p>
                 </div>
                 <span className="text-gray-600 font-bold text-sm">450ml</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F8F9FD] rounded-[24px]">
                 <div className="bg-orange-100 text-orange-600 p-3 rounded-2xl">
                    <FaTruck size={20} />
                 </div>
                 <div className="flex-1 px-4 text-right">
                    <h5 className="font-bold text-gray-800">صرف لمستشفى الأمل</h5>
                    <p className="text-gray-400 text-[10px]">طلب طارئ • منذ 2 ساعة</p>
                 </div>
                 <span className="text-gray-600 font-bold text-sm">3 أكياس</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}