"use client";
import React, { useState } from 'react';
// استيراد الأيقونات
import {  IoIosArrowForward, IoMdNotificationsOutline } from "react-icons/io";
import { FiSearch, FiFileText } from "react-icons/fi";
import {  MdOutlineCancel, MdRefresh, MdAccessTime, MdWaterDrop } from "react-icons/md";
import { FaArrowLeft, FaCheckCircle, FaClock, FaHospital, FaMapMarkerAlt, FaRegPlusSquare } from "react-icons/fa";
import { LuCircleCheckBig } from 'react-icons/lu';
import { RxDotFilled } from 'react-icons/rx';
import {  FiMapPin } from "react-icons/fi";
import { MdOutlineDoneAll, MdOutlineAccessTime, MdOutlineCheckCircle } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { FaClockRotateLeft } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import Link from 'next/link';
// 1. تعريف أنواع البيانات (Interfaces)
interface Order {
  id: string;
  hospital: string;
  status: string;
  date: string;
  type: 'success' | 'cancelled' | 'pending';
  bloodType: string;
  reason?: string;
}

// 1. تغيير اسم الـ interface إلى BloodRequest ليكون أكثر دقة
interface BloodRequest {
  id: string;
  hospital: string;
  status: string;
  time: string;
  bloodType: string;
  progress: number; 
  currentStep: 'طلب' | 'موافقة' | 'تجهيز' | 'استلام' | 'مراجعة' | 'جاهز';
  color: 'emerald' | 'orange' | 'blue';
  address?: string;
}

const OrdersPage: React.FC = () => {
  // الحالة للتبديل بين التبويبات
  const [activeTab, setActiveTab] = useState<'current' | 'previous'>('current');

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 md:p-8" dir="rtl">
      <div className="max-w-[95%] mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded-full">
                <FaArrowLeft  className="text-xl text-gray-800" />
                </button>
                <h1 className="text-xl font-bold text-slate-800">طلباتي</h1>
            </div>
            <Link href={"/notifications"} className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                <IoMdNotificationsOutline className="text-2xl text-gray-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Link>
        </div>

        {/* Tabs - التبويبات */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-3 text-center font-bold text-sm transition-all relative ${
              activeTab === 'current' ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            الحالية
            {activeTab === 'current' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 animate-in fade-in"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('previous')}
            className={`flex-1 py-3 text-center font-bold text-sm transition-all relative ${
              activeTab === 'previous' ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            السابقة
            {activeTab === 'previous' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 animate-in fade-in"></div>}
          </button>
        </div>

        {/* Search Bar */}
        {/* <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="البحث في السجل..."
            className="w-full bg-white border border-gray-100 p-3 pr-10 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all"
          />
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div> */}

        {/* المحتوى المتغير بناءً على التبويب */}
        <div className="transition-all duration-300">
          {activeTab === 'previous' ? <PreviousOrdersContent /> : <CurrentOrdersContent />}
        </div>

      </div>
    </div>
  );
};

// --- المكونات الفرعية (Sub-components) ---

const PreviousOrdersContent: React.FC = () => {
  const previousData: Order[] = [
    { id: "45892", hospital: "مستشفى جامعة بنها", status: "تم الاستلام", date: "15 أكتوبر، 10:00 ص", type: 'success', bloodType: 'O+' },
    { id: "45901", hospital: "مستشفى دار الشفاء", status: "ملغي", date: "12 أكتوبر، 04:30 م", type: 'cancelled', bloodType: 'O-', reason: "سبب الإلغاء: عدم توفر الفصيلة المطلوبة حالياً" },
    { id: "45880", hospital: "مستشفى النيل التخصصي", status: "تم الاستلام", date: "10 أكتوبر، 09:15 م", type: 'success', bloodType: 'A+' },
  ];

  return (
    <div className="space-y-5 animate-in slide-in-from-bottom-4 duration-500">
        
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="الطلبات المكتملة" count="12 طلب" icon={<LuCircleCheckBig />} active />
        <StatCard title="الطلبات الملغاة" count="2 طلب" icon={<MdOutlineCancel />} />
      </div>

              {/* Search Bar */}
      <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="البحث في السجل..."
            className="w-full bg-white border border-gray-100 p-3 pr-10 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all"
          />
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div>

      {/* List */}
      {previousData.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

// const CurrentOrdersContent: React.FC = () => {
//   // مثال لطلب حالي "تحت التنفيذ"
//   const currentData: Order[] = [
//     { id: "46022", hospital: "مستشفى قصر العيني", status: "جاري التحضير", date: "الآن", type: 'pending', bloodType: 'B+' },
//   ];

//   if (currentData.length === 0) {
//     return (
//       <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
//         <FaHospital className="text-gray-200 text-6xl mx-auto mb-4" />
//         <p className="text-gray-500 font-bold">لا توجد طلبات جارية حالياً</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-5 animate-in slide-in-from-right-4 duration-500">
//        <h3 className="text-sm font-bold text-gray-500 mb-2 px-1">طلبات قيد التنفيذ</h3>
//        {currentData.map((order) => (
//          <OrderCard key={order.id} order={order} />
//        ))}
//     </div>
//   );
// };

// مكون كرت الإحصائيات

const CurrentOrdersContent: React.FC = () => {
  // 2. تحديث مصفوفة البيانات لتستخدم النوع الجديد BloodRequest
  const requests: BloodRequest[] = [
    {
      id: "45892",
      hospital: "مستشفى جامعة بنها",
      status: "جاهز للاستلام",
      time: "منذ 15 دقيقة",
      bloodType: "B+",
      progress: 70,
      currentStep: "جاهز",
      color: "emerald"
    },
    {
      id: "45901",
      hospital: "مستشفى دار الشفاء",
      status: "قيد المراجعة",
      time: "منذ ساعتين",
      bloodType: "O-",
      progress: 30,
      currentStep: "مراجعة",
      color: "orange"
    },
    {
      id: "45880",
      hospital: "مستشفى النيل التخصصي",
      status: "تم القبول",
      time: "أمس، 5:30 م",
      bloodType: "A+",
      progress: 50,
      currentStep: "موافقة",
      color: "blue",
      address: "شارع التحرير، الدقي، الجيزة"
    }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500" dir="rtl">
      
      {/* الإحصائيات العلوية */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#e7f4ea] p-4 rounded-2xl flex items-center justify-between border border-emerald-100">
          <div className="text-right">
            <p className="text-[12px] text-emerald-600 font-bold mb-1 uppercase tracking-wider">الطلبات النشطة</p>
            <p className="text-xl font-black text-emerald-700">3 طلبات</p>
          </div>
          <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-200">
             <MdWaterDrop size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm">
          <div className="text-right">
            <p className="text-[12px] text-gray-400 font-bold mb-1 uppercase tracking-wider">المكتملة</p>
            <p className="text-xl font-black text-slate-800">12 طلب</p>
          </div>
          <div className="bg-gray-100/40 p-2 rounded-xl text-gray-400">
             <FaClockRotateLeft  size={24} />
          </div>
        </div>
        
        
      </div>

      {/* شريط البحث */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="البحث برقم الطلب أو المستشفى..."
          className="w-full bg-white border border-gray-100 p-3 pr-10 rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
        />
        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {/* قائمة الطلبات */}
      <div className="space-y-4">
        {requests.map((request) => (
          <ActiveOrderCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};

// 3. تحديث المكون الفرعي لاستقبال النوع الجديد BloodRequest
const ActiveOrderCard: React.FC<{ request: BloodRequest }> = ({ request }) => {
  const theme = {
    emerald: { text: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", fill: "bg-emerald-500", icon: <GoDotFill /> },
    orange: { text: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200", fill: "bg-orange-500", icon : <FaClock /> },
    blue: { text: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200", fill: "bg-blue-500", icon : <FaCheckCircle /> }
  }[request.color];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 overflow-hidden">
      {/* Header البطاقة */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="bg-gray-50 p-3 rounded-2xl relative ring-1 ring-gray-100">
             <FaRegPlusSquare className={`text-2xl ${request.color === 'emerald' ? 'text-emerald-500' : 'text-gray-400'}`} />
             <span className="absolute -bottom-1 -left-1 bg-emerald-500 text-[9px] text-white px-1.5 py-0.5 rounded-md font-bold uppercase ring-2 border-white">
               {request.bloodType}
             </span>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-slate-800 text-md">{request.hospital}</h4>
            <p className="text-[12px] font-bold text-gray-300 mt-1">رقم الطلب #{request.id}</p>
          </div>
        </div>
        <div className="text-left">
          <span className={`text-[12px] flex justify-center items-center gap-1 px-3 py-1 rounded-full font-bold border ${theme.text} ${theme.bg} ${theme.border}`}>
            {theme.icon} {request.status}
          </span>
          <p className="text-[12px] text-gray-300 mt-2 font-medium">{request.time}</p>
        </div>
      </div>

      {/* شريط التقدم */}
      <div className="relative mb-10 mt-4 px-2">
        <div className="h-1.5 w-full bg-gray-100 rounded-full absolute top-1/2 -translate-y-1/2" />
        <div 
          className={`h-1.5 rounded-full absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ${theme.fill}`}
          style={{ width: `${request.progress}%` }}
        />
        
        <div className="relative flex justify-between text-[10px] font-bold">
           {/* طلب */}
           <div className="flex  items-center gap-2 -translate-y-3.75">
              <div className="w-3 h-3 rounded-full border-2 border-white shadow-sm bg-emerald-500" />
              <span className="text-gray-300">طلب</span>
           </div>
           {/* موافقة / مراجعة */}
           <div className="flex  items-center gap-2 -translate-y-3.75">
              <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${request.progress >= 33 ? theme.fill : 'bg-gray-200'}`} />
              <span className={request.currentStep === 'موافقة' || request.currentStep === 'مراجعة' ? theme.text : 'text-gray-300'}>
                 {request.currentStep === 'مراجعة' ? 'مراجعة' : 'موافقة'}
              </span>
           </div>
           {/* تجهيز */}
           <div className="flex  items-center gap-2 -translate-y-3.75">
              <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${request.progress >= 66 ? theme.fill : 'bg-gray-200'}`} />
              <span className={request.currentStep === 'جاهز' ? 'text-emerald-500' : 'text-gray-300'}>تجهيز</span>
           </div>
           {/* استلام */}
           <div className="flex  items-center gap-2 -translate-y-3.75">
              <div className="w-3 h-3 rounded-full border-2 border-white shadow-sm bg-gray-200" />
              <span className="text-gray-300">استلام</span>
           </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4">
        {request.currentStep === 'جاهز' ? (<div className="flex gap-3">
          <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95">
             جاهز للاستلام <MdOutlineDoneAll className="text-xl" />
          </button>
            <div className="flex items-center justify-center w-16  h-14 cursor-pointer border border-gray-100 rounded-xl bg-[#F8F9FB] text-slate-500">
        <FaMapMarkerAlt size={24} fill="currentColor" className="opacity-80" />
      </div>
        </div>
        ) : request.address ? (
          <div className="bg-gray-50/50 p-4 rounded-2xl flex items-center justify-between border border-gray-100/50">
             <div className="flex items-center gap-.5">
                <div className=" p-2 text-2xl text-black/30 font-bold">
                   <FiMapPin />
                </div>
                <span className="text-[13px] text-gray-500 font-medium">{request.address}</span>
             </div>
             <IoIosArrowForward className="text-gray-300 rotate-180" />
          </div>
        ) : (
          <button className="w-full bg-white border border-gray-100 py-3.5 rounded-2xl text-xs font-bold text-gray-500 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors group">
            عرض التفاصيل 
            <IoIosArrowForward className="group-hover:translate-x-[-4px] transition-transform rotate-180 " />
          </button>
        )}
      </div>
    </div>
  );
};
const StatCard: React.FC<{ title: string; count: string; icon: React.ReactNode; active?: boolean }> = ({ title, count, icon, active }) => (
  <div className={`p-4 rounded-2xl flex items-center justify-between border shadow-sm transition-all ${active ? 'bg-[#e9f6ef] border-emerald-100' : 'bg-white border-gray-50'}`}>
    <div className="text-right">
      <p className={`text-[14px] font-bold mb-1 ${active ? 'text-gray-500' : 'text-gray-400'}`}>{title}</p>
      <p className={`text-xl  font-black ${active ? 'text-[#22a466]' : 'text-slate-800'}`}>{count}</p>
    </div>
    <div className={`p-2.5 rounded-xl  shadow-sm ${active ? 'bg-emerald-500 text-white' : 'bg-gray-200/30 text-black/50'}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </div>
  </div>
);

// مكون كرت الطلب
const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
  <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-3">
        <div className="bg-gray-50 p-3 rounded-2xl relative ring-1 ring-gray-100">
          <FaRegPlusSquare className="text-2xl text-emerald-600" />
          <span className="absolute -bottom-1 -left-1 bg-emerald-500 text-[8px] text-white px-1.5 py-0.5 rounded-md font-bold ring-2 border-white uppercase">
            {order.bloodType}
          </span>
        </div>
        <div className="text-right">
          <h4 className="font-bold text-slate-800 text-sm md:text-base">{order.hospital}</h4>
          <p className="text-[12px] text-gray-400 mt-0.5">رقم الطلب : #{order.id}</p>
        </div>
      </div>
      <div className="text-left">
        <span className={`text-[12px] px-2 py-1  rounded-full font-bold flex items-center justify-center gap-.5 ${
          order.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 
          order.type === 'cancelled' ? 'bg-gray-100 text-gray-400' : 'bg-amber-50 text-amber-600'
        }`}>
            <span className="text-[8px] flex items-center justify-center"><RxDotFilled className='text-2xl' /></span> {order.status}
        </span>
        <p className="text-[12px] text-gray-300 mt-2 font-medium">{order.date}</p>
      </div>
    </div>

    {order.reason && (
      <div className="bg-red-50/50 p-2 rounded-lg mb-4">
        <p className="text-[11px] text-red-400 font-medium">{order.reason}</p>
      </div>
    )}

    <button className="w-full bg-[#fcfdfe] border border-gray-100 py-3 rounded-2xl text-xs font-bold text-gray-500 flex items-center justify-center gap-2 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all group">
      {order.type === 'success' ? (
        <><FiFileText className="text-lg" /> عرض تفاصيل الفاتورة</>
      ) : order.type === 'pending' ? (
        <><MdAccessTime className="text-lg" /> تتبع حالة الطلب</>
      ) : (
        <><MdRefresh className="text-lg group-hover:rotate-180 transition-transform duration-500" /> إعادة الطلب</>
      )}
    </button>
  </div>
);

export default OrdersPage;