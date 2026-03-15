"use client";
import React, { useState } from "react";
import { IoSearchOutline, IoAdd, IoFilterOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdBloodtype, MdDelete, MdKeyboardArrowLeft } from "react-icons/md";
import { BloodStock, StockStatus } from "@/types/inventory";
import Link from "next/link";
import { FaArrowTrendDown } from "react-icons/fa6";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<StockStatus>('الكل');

  const stockData: BloodStock[] = [
    { id: "1", type: "+A", label: "فصيلة A إيجابي", balance: 350, status: "متاح" },
    { id: "2", type: "-O", label: "فصيلة O سلبي", balance: 45, status: "قارب الانتهاء", note: "12 كيس تنتهي صلاحيتها خلال 24 ساعة" },
    { id: "3", type: "+B", label: "فصيلة B إيجابي", balance: 210, status: "متاح" },
    { id: "4", type: "-AB", label: "فصيلة AB سلبي", balance: 12, status: "منتهي" },
  ];

  // تصفية البيانات بناءً على التبويب النشط
  const filteredData = activeTab === 'الكل' 
    ? stockData 
    : stockData.filter(item => item.status === activeTab);

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-4 md:p-10" dir="rtl">
      {/* الهيدر العلوي */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="text-right">
            <h1 className="text-2xl font-black text-gray-800">إدارة المخزون</h1>
            <p className="text-gray-400 text-sm">بنك الدم المركزي</p>
          </div>
          <div className="flex gap-4 items-center">
             <Link href={"inventory/add"} className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                <IoAdd size={24} />
             </Link>
          </div>
        </div>
        {/* بحث عن فصيله */}
         <div className="relative w-full  mb-5">
              <input 
                type="text" 
                placeholder="بحث عن فصيلة، رقم كيس، أو موقع..."
                className="w-full bg-white p-4 pr-12 rounded-2xl text-sm border border-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
              <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <IoFilterOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
        </div>

        {/* الكروت العلوية (الإحصائيات) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-l from-blue-600 to-blue-400 p-5  rounded-[32px] text-white flex justify-between items-center shadow-xl">
             <div className="text-right">
                <p className="text-blue-100 text-base font-bold mb-1">إجمالي الوحدات</p>
                <h3 className="text-4xl font-black">1,240</h3>
                <span className="text-[10px] bg-white/20 px-2 py-1 rounded-lg mt-2 inline-block">24+ هذا الأسبوع</span>
             </div>
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
             <MdBloodtype size={30}  />
                {/* <div className="w-8 h-8 bg-white rounded-full opacity-50 shadow-inner"></div> */}
             </div>
          </div>
          
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 flex justify-between items-center shadow-sm relative overflow-hidden">
             <div className="absolute right-0 top-0 bottom-0 w-1 bg-orange-400/40"></div>
             <div className="text-right">
                <p className="text-orange-500 text-sm font-bold flex items-center gap-1">
                   ⚠️ تنتهي قريباً
                </p>
                <h3 className="text-4xl font-black text-gray-800">15</h3>
                <p className="text-red-500 text-[10px] mt-1 font-bold">خلال 48 ساعة</p>
             </div>
              <div className="w-12 h-12 bg-orange-400/40 rounded-2xl flex items-center justify-center shadow-xl">
             <FaArrowTrendDown size={30}  color="red"/>
             </div>
          </div>
        </div>

        {/* شريط البحث والتبويبات */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3 ">
                <h2 className="text-xl font-bold">قائمة الفصائل </h2>
                <span className="text-[#3d8eff] font-semibold">{activeTab}</span>
            </div>
           <div className="flex items-center gap-3">
              {[
                { id: 'الكل', color: 'bg-gray-800' },
                { id: 'متاح', color: 'bg-green-500' },
                { id: 'قارب الانتهاء', color: 'bg-orange-400' },
                { id: 'منتهي', color: 'bg-red-500' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as StockStatus)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                    activeTab === tab.id 
                    ? `${tab.color} text-white shadow-md` 
                    : "bg-white text-gray-400 border border-gray-50"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeTab === tab.id ? "bg-white" : tab.color}`}></span>
                  {tab.id}
                </button>
              ))}
           </div>

        </div>

        {/* قائمة الفصائل */}
        <div className="space-y-4">
          {filteredData.map((item) => (
            <div key={item.id} className="group transition-all">
              <div className={`bg-white p-5 rounded-[24px] border border-gray-50 flex items-center justify-between shadow-sm hover:shadow-md transition-all relative overflow-hidden ${item.status === 'قارب الانتهاء' ? 'rounded-b-none' : ''}`}>
                <div className="flex items-center gap-8">
                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center relative ${
                     item.status === 'منتهي' ? "bg-blue-50 text-blue-400" : "bg-red-50 text-red-500"
                   }`}>
                      <span className="text-lg font-black">{item.type}</span>
                      <span className={`absolute bottom-1 left-1 w-2 h-2 rounded-full border-2 border-white ${
                        item.status === 'متاح' ? "bg-green-500" : item.status === 'قارب الانتهاء' ? "bg-orange-400" : "bg-red-500"
                      }`}></span>
                   </div>
                   <div className="">
                      <h4 className="font-bold text-gray-800">{item.label}</h4>
                      <p className="text-gray-400 text-xs mt-1">
                         الرصيد: <span className="font-bold text-gray-600">{item.balance} كيس</span>
                      </p>
                   </div>
                   
                </div>
                <div className="flex items-center gap-6">
                   <Link href={"add"} className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all">
                      <FaEdit size={16} />
                   </Link>
                   <button className="text-gray-300 hover:text-red-500 transition-colors">
                      <MdDelete size={24} />
                   </button>
                </div>


                {/* الخط الملون الجانبي */}
                <div className={`absolute right-0 top-0 bottom-0 w-1.5 ${
                  item.status === 'متاح' ? "bg-green-500" : item.status === 'قارب الانتهاء' ? "bg-orange-400" : "bg-red-500"
                }`}></div>
              </div>

              {/* تنبيه انتهاء الصلاحية (يظهر فقط إذا وجد نوت) */}
              {item.note && (
                <div className="bg-orange-50 p-3 px-8 rounded-b-[24px] border-t border-orange-100 flex items-center justify-start gap-2 text-orange-700 text-[10px] font-bold">
                   <span className="text-orange-400">🕒</span>
                   {item.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}