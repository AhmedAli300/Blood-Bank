"use client";
import React from "react";
import { IoCheckmarkCircleOutline, IoCalendarOutline } from "react-icons/io5";
import { MdOutlineBloodtype, MdFormatListNumbered } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function AddStockPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FD] p-4 md:p-10 font-sans" >
      <div className="max-w-6xl mx-auto">
        
        {/* العناوين العلوية */}
        <div className="s mb-10">
            <div className="flex items-center gap-2">
                <Link href={"/inventory"}><FaArrowRight /></Link>
                <h1 className="text-3xl font-black text-gray-800">إضافة مخزون جديد</h1>
            </div>
            <p className="text-gray-400 mt-2">يرجى ملء البيانات التالية لتحديث قاعدة البيانات.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
            {/* القسم الأيمن: الفورم الرئيسي */}
          {/* <div className=""><h1>fff</h1></div> */}
          <div className="w-full lg:w-2/3 bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-50 order-2 lg:order-1">
            <form className="space-y-4">
              
              {/* اختيار فصيلة الدم */}
              <div>
                <label className="block text-gray-700 font-bold mb-3 text-sm">فصيلة الدم</label>
                <div className="relative">
                  <select className="w-full bg-gray-50 border-none p-4 py-3 rounded-2xl appearance-none text-gray-500 focus:ring-2 focus:ring-blue-100 outline-none">
                    <option>اختر فصيلة الدم</option>
                    <option>+A</option>
                    <option>-A</option>
                    <option>+O</option>
                  </select>
                  <MdOutlineBloodtype className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" size={20} />
                </div>
              </div>

              {/* عدد الأكياس */}
              <div>
                <label className="block text-gray-700 font-bold mb-3 text-sm">عدد الأكياس</label>
                <div className="relative">
                  <input type="number" placeholder="0" className="w-full bg-gray-50 border-none p-4 py-3  rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none" />
                  {/* <FiBox className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} /> */}
                </div>
              </div>

              {/* رقم التشغيلة */}
              <div>
                <label className="block text-gray-700 font-bold mb-3 text-sm">رقم التشغيلة (Batch Number)</label>
                <div className="relative">
                  <input type="text" placeholder="مثال : BN-12345" className="w-full bg-gray-50 border-none p-4 py-3  rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none" />
                  <MdFormatListNumbered className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                </div>
              </div>

              {/* التواريخ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-3 text-sm">تاريخ الإضافة</label>
                  <div className="relative">
                    <input type="date" className="w-full bg-gray-50 border-none p-4 py-3  rounded-2xl text-gray-400 focus:ring-2 focus:ring-blue-100 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-3 text-sm">تاريخ الانتهاء</label>
                  <div className="relative">
                    <input type="date" className="w-full bg-gray-50 border-none p-4 py-3  rounded-2xl text-gray-400 focus:ring-2 focus:ring-blue-100 outline-none" />
                  </div>
                </div>
              </div>

              {/* ملاحظات إضافية */}
              <div>
                <label className="block text-gray-700 font-bold mb-3 text-sm">ملاحظات إضافية</label>
                <textarea placeholder="أضف أي ملاحظات هنا..." rows={4} className="w-full bg-gray-50 border-none p-4 py-3  rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none resize-none"></textarea>
              </div>

              {/* زر التأكيد */}
              <button type="submit" className="w-full bg-[#0066CC] text-white py-3 rounded-[20px] font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                <IoCheckmarkCircleOutline size={24} />
                تأكيد الإضافة
              </button>

            </form>
          </div>

          {/* القسم الأيسر: آخر الإضافات */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-extrabold text-gray-800">آخر الإضافات</h2>
              <button className="text-blue-600 text-sm font-bold hover:underline">عرض الكل</button>
            </div>
            
            <div className="space-y-4">
              {[
                { id: "BN-99281", type: "-O", amount: 12, time: "منذ 10 دقائق", color: "text-blue-500 bg-blue-50" },
                { id: "BN-99275", type: "+A", amount: 5, time: "ساعة واحدة", color: "text-blue-600 bg-blue-50" },
                { id: "BN-99182", type: "+B", amount: 8, time: "منذ 3 ساعات", color: "text-blue-600 bg-blue-50" },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-[24px] flex items-center justify-between shadow-sm border border-gray-50">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ${item.color}`}>
                    {item.type}
                  </div>
                  <div className="text-right flex-1 px-4">
                    <h4 className="font-bold text-gray-800">{item.amount} أكياس</h4>
                    <p className="text-gray-400 text-[10px]">{item.time}</p>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-gray-300 block mb-1">{item.id}</span>
                    <span className="text-[10px] bg-green-50 text-green-500 px-2 py-1 rounded-lg font-bold">تم الحفظ</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        

        </div>
      </div>
    </div>
  );
}