"use client";
import React, { useState } from "react";
import { IoSearchOutline, IoTimeOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaHospital } from "react-icons/fa";
import { MdOutlineBloodtype } from "react-icons/md";
import { Order, TabType } from "@/types/requests";
import OrderCard from "@/components/OrderCard/OrderCard";







export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('new');

  // بيانات تجريبية لمحاكاة الواقع
  const orders: Order[] = [
    {
      id: "1",
      patientName: "سارة إبراهيم محمود",
      hospitalName: "مستشفى القصر العيني",
      bloodType: "-A",
      bagsCount: 1,
      status: "عادي",
      time: "منذ 45 دقيقة"
    },
    {
      id: "2",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "عاجل جداً",
      time: "منذ 15 دقيقة"
    
    },
    {
      id: "3",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "جاري المعالجة",
      time: "منذ 15 دقيقة"
    
    },
    {
      id: "4",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "عاجل جداً",
      time: "منذ 15 دقيقة"
    
    },
   
    {
      id: "5",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "عاجل جداً",
      time: "أمس"
    },
    {
      id: "6",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "عاجل جداً",
      time: "أمس"
    },
    {
      id: "7",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "عاجل جداً",
      time: "أمس"
    },
     {
      id: "8",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "جاري التجهيز",
      time: "أول أمس "
    },
    {
      id: "9",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "جاري التجهيز",
      time: "أول أمس "
    },
    {
      id: "10",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "جاري التجهيز",
      time: "أول أمس"
    
    },
    {
      id: "11",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "تم التسليم",
      time: "2/2025"
    },
    {
      id: "12",
      patientName: "محمد أحمد علي",
      hospitalName: "مستشفى الأمل الدولي",
      bloodType: "+O",
      bagsCount: 2,
      status: "تم التسليم",
      time: "3/2026"
    
    },
  ];





// const getGroupedOrders = (orders: Order[]) => {
//   const groups: { [key: string]: Order[] } = {};

//   orders.forEach((order) => {
//     const date = new Date(order.createdAt);
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);

//     let label = "";

//     if (date.toDateString() === today.toDateString()) {
//       label = "طلبات اليوم";
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       label = "أمس";
//     } else {
//       // تنسيق التاريخ للأيام الأقدم مثل "22 أكتوبر 2023"
//       label = date.toLocaleDateString('ar-EG', { 
//         day: 'numeric', 
//         month: 'long', 
//         year: 'numeric' 
//       });
//     }

//     if (!groups[label]) groups[label] = [];
//     groups[label].push(order);
//   });

//   return groups;
// };






  return (
    <div className="min-h-screen  pb-10 px-5  bg-white" >
      
      {/* --- الهيدر والتبويبات --- */}
      <header className=" border-b border-gray-100 p-4 pt-5 sticky top-0 z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h1 className="text-xl font-bold text-gray-800">إدارة الطلبات</h1>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="بحث برقم الطلب، اسم المستشفى..."
                className="w-full p-3 pr-11 bg-[#F8F9FD] border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <nav className=" border-b-2 border-black/10 flex justify-start gap-10 relative">
            {[
              { id: 'new', label: 'جديد', count: 3 },
              { id: 'processing', label: 'قيد التجهيز', count: 5 },
              { id: 'completed', label: 'السجل', count: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`pb-4 text-sm font-bold transition-all relative ${
                  activeTab === tab.id ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label} {tab.count && `(${tab.count})`}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* --- المحتوى (الكروت) --- */}
  <main className="max-w-7xl mx-auto p-6 bg-[#f9fafc]">
  <div className=" flex flex-col gap-10">

    {/* --- أولاً: حالة قسم "جديد" --- */}
    {activeTab === 'new' && (
      <>
        {/* --- قسم طلبات اليوم --- */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-7 bg-blue-600 rounded-full"></div>
            <h2 className="text-lg font-extrabold text-gray-800">طلبات اليوم</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders
              .filter((o) => o.time.includes("دقيقة") || o.time.includes("ساعة")) // فلتر لطلبات اليوم فقط
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </div>

        {/* --- قسم طلبات الأمس --- */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-7 bg-gray-300 rounded-full"></div> {/* لون رمادي لطلبات قديمة */}
            <h2 className="text-lg font-extrabold text-gray-800 text-gray-500">أمس</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 opacity-80"> {/* شفافية بسيطة للتمييز */}
            {/* هنا نضع الطلبات التي وقتها "أمس" */}
            {orders
              .filter((o) => o.time.includes("أمس"))
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            {/* إذا لم توجد بيانات للأمس، يمكنك تركها فارغة أو وضع رسالة */}
          </div>
        </div>
      </>
    )}


    {/* --- ثانياً: حالة قسم "قيد التجهيز" --- */}
    {activeTab === 'processing' && (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-7 bg-orange-400 rounded-full"></div>
          <h2 className="text-lg font-extrabold text-gray-800">طلبات قيد المعالجة</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders
            .filter((o) => o.status === "جاري التجهيز")
            .map((order) => <OrderCard key={order.id} order={order} />)
          }
        </div>
      </div>
    )}


{/* --- ثالثاً: حالة قسم "السجل" (منتهي) --- */}
    {activeTab === 'completed' && (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-7 bg-green-500 rounded-full"></div>
          <h2 className="text-lg font-extrabold text-gray-800">سجل العمليات المكتملة</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders
            .filter((o) => o.status === "تم التسليم")
            .map((order) => <OrderCard key={order.id} order={order} />)
          }
        </div>
      </div>
    )}

  </div>
</main>
    </div>
  );
}


//  : (
//       /* --- عرض الأقسام الأخرى (قيد التجهيز / السجل) --- */
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {activeTab !== 'new' && (
//           <div className="col-span-full text-center py-20 text-gray-400 font-bold">
//             لا يوجد طلبات حالياً في قسم {activeTab === 'processing' ? "قيد التجهيز" : "السجل"}
//           </div>
//         )}
//       </div>
//     )