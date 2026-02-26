"use client";
import { useState } from 'react';
import { BiSolidDonateBlood } from 'react-icons/bi';
import { HiOutlineAdjustments, HiOutlineLocationMarker } from "react-icons/hi"; // أيقونة اللوكيشن
import { RiMap2Line } from "react-icons/ri"; // أيقونة الخريطة (المدينة)
import { IoIosArrowDown } from "react-icons/io"; // سهم السلكت
import {  FaMinus, FaPlus, FaSearch } from 'react-icons/fa';
import { MdOutlineSort } from 'react-icons/md';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { AiOutlineEye } from 'react-icons/ai';
// بيانات تجريبية لمحاكاة الواقع
const bloodBanks = [
  { id: 1, name: "بنك الدم الإقليمي", location: "العباسية، القاهرة", distance: "2.5 كم", rating: 4.8, status: "available", bags: 5 },
  { id: 2, name: "مستشفى دار الشفاء", location: "العباسية، بجوار المترو", distance: "3.8 كم", rating: 4.2, status: "limited", bags: 2 },
  { id: 3, name: "بنك الشروق للدم", location: "مدينة نصر", distance: "7.1 كم", rating: 4.5, status: "unavailable", bags: 0 },
];

export default function BloodBankPage() {
  const [selectedBlood, setSelectedBlood] = useState("O+");
  const [bagCount, setBagCount] = useState(1);

  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-tajawal text-right" dir="rtl">
      
      {/* قسم البحث والفلترة */}
      <section className="xl:max-w-[96%]  mx-auto bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* اختيار الفصيلة */}
          <div className="space-y-4">
            <div className="flex items-center gap-1  text-gray-800 font-bold">
              <span className="text-green-600 text-2xl"><BiSolidDonateBlood /></span>
              <span className='text-xl'>اختر فصيلة الدم</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-start">
              {bloodTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedBlood(type)}
                  className={`px-5 py-2 rounded-xl border transition-all ${selectedBlood === type ? "bg-green-600 text-white border-green-600 shadow-md scale-105" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* اختيار المدينة والمحافظة */}
          <div className="grid grid-cols-2 gap-4">
            {/* حقل المحافظة */}
            <div className="flex-1 min-w-50">
                <label className="block text-gray-500 text-[13px] font-bold mb-1.5 pr-1"> المحافظة</label>
                <div className="relative flex items-center group">
                {/* الأيقونة اليمنى (لوكيشن) */}
                <div className="absolute right-3.5 text-gray-400 group-focus-within:text-green-600 transition-colors"><HiOutlineLocationMarker size={22} /></div>
                <select className="w-full appearance-none bg-[#F8F9FB] border border-gray-100 rounded-2xl py-3.5 pr-11 pl-10 text-gray-700 font-medium outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500 transition-all cursor-pointer">
                    <option>القاهرة</option>
                    <option>الجيزة</option>
                </select>
                {/* سهم السلكت الأيسر */}
                <div className="absolute left-4 text-gray-400 pointer-events-none"><IoIosArrowDown size={18} /></div>
                </div>
            </div>
            {/* حقل المدينة */}
            <div className="flex-1 min-w-50">
                <label className="block text-gray-500 text-[13px] font-bold mb-1.5 pr-1"> المدينة</label>
                <div className="relative flex items-center group">
                {/* الأيقونة اليمنى (خريطة) */}
                <div className="absolute right-3.5 text-gray-400 group-focus-within:text-green-600 transition-colors"><RiMap2Line size={20} /></div>
                <select className="w-full appearance-none bg-[#F8F9FB] border border-gray-100 rounded-2xl py-3.5 pr-11 pl-10 text-gray-700 font-medium outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500 transition-all cursor-pointer">
                    <option>المعادي</option>
                    <option>مدينة نصر</option>
                </select>
                {/* سهم السلكت الأيسر */}
                <div className="absolute left-4 text-gray-400 pointer-events-none"><IoIosArrowDown size={18} /></div>
                </div>
            </div>
          </div>
        </div>

        {/* الجزء السفلي من الفلتر */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-black/5 pt-8">
          <div className="flex items-center justify-center">
            <span className="text-lg font-bold text-gray-500 px-2"> عدد الأكياس : </span>
            <div className="border flex items-center justify-center gap-4 bg-gray-50 p-2  rounded-2xl border-gray-200">
                <button onClick={() => setBagCount(prev => prev + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-green-600 text-xl font-bold cursor-pointer"><FaPlus /></button>
                <span className="text-xl font-bold w-6 text-center">{bagCount}</span>
                <button onClick={() => setBagCount(prev => Math.max(1, prev - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-red-400 text-xl font-bold cursor-pointer"><FaMinus /></button>
            </div>
          </div>

          <button className="w-full md:w-auto bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg"> <FaSearch />
             بحث عن بنوك الدم 
          </button>
        </div>
      </section>

      {/* قسم النتائج */}
      <section className="xl:max-w-[96%] mx-auto">
        <div className="flex justify-between items-center mb-8 px-2">
            <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-800">بنوك الدم المتاحة</h2>
                <p className="text-sm text-gray-400">تم العثور على {bloodBanks.length} نتيجة في منطقتك</p>
            </div>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                    <MdOutlineSort size={20} className="text-gray-500" />
                    <span className="text-sm font-medium">الترتيب حسب المسافة</span>
                </button>
                {/* زر تصفية */}
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                    <HiOutlineAdjustments size={20} className="text-gray-500 rotate-90" />
                    <span className="text-sm font-medium">تصفية</span>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bloodBanks.map((bank) => (
            <div key={bank.id} className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                
                <div className=" flex gap-2.5">
                    <div className="bg-[#E9F5EE] p-3 rounded-2xl">
                        <FaRegSquarePlus  className="text-[#2D8A56]" size={24} />
                    </div>
                    <div className="">
                        <h3 className="font-bold text-lg text-gray-800">{bank.name}</h3>
                        <p className="text-xs text-gray-400 mt-1">{bank.location} | {bank.distance}</p>
                    </div>
                </div>
                <span className={` ${bank.rating > 4.2 ? "bg-yellow-50" : "bg-yellow-100/20"} text-yellow-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1`}>
                   {bank.rating} ★
                </span>
              </div>

              {/* حالة التوفر */}
              {bank.status === "available" && (
                <div className="bg-green-50 text-green-700 text-center py-2.5 rounded-2xl text-sm mb-6 font-bold border border-green-100">
                  ● متوفر: {bank.bags} أكياس ({selectedBlood})
                </div>
              )}
              {bank.status === "limited" && (
                <div className="bg-orange-50 text-orange-700 text-center py-2.5 rounded-2xl text-sm mb-6 font-bold border border-orange-100">
                  ● مخزون محدود: {bank.bags} كيس
                </div>
              )}
              {bank.status === "unavailable" && (
                <div className="bg-red-50 text-red-500 text-center py-2.5 rounded-2xl text-sm mb-6 font-bold border border-red-100">
                  ⚠️ غير متوفر حالياً
                </div>
              )}

              {bank.status !== "unavailable" ? (
                <div className="flex justify-between items-center gap-4">
                    <button className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-bold transition-colors shadow-sm">
                    طلب الآن
                    </button>
                    <button className="p-3 py-3 cursor-pointer border border-gray-100 rounded-2xl text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                        <AiOutlineEye size={24} />
                    </button>
                </div> 
              ) : (
                <button className="w-full bg-gray-100 text-gray-400 py-3 rounded-2xl font-bold cursor-not-allowed border border-gray-200">
                  إبلاغي عند التوفر
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}