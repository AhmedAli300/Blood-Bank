"use client";
import React from 'react';
import { FaCheck, FaClock } from 'react-icons/fa';
import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-[89.8vh] bg-[#F8F9FB] flex items-center justify-center p-4 pt-1 font-tajawal" dir="rtl">
      <div className="max-w-xl w-full text-center space-y-4 animate-in zoom-in duration-500">
        
        {/* أيقونة النجاح العائمة */}
        <div className="relative mx-auto w-18 h-18 bg-[#2D8A5B] rounded-full flex items-center justify-center shadow-xl shadow-green-900/20">
          <FaCheck className="text-white text-3xl" />
          <div className="absolute inset-0 rounded-full bg-[#2D8A5B] animate-ping opacity-20"></div>
        </div>

        {/* نصوص التأكيد */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-800">تم إرسال طلبك بنجاح!</h1>
          <p className="text-gray-500 leading-relaxed px-6">
            طلبك الآن قيد المراجعة من قبل بنك الدم. سيصلك إشعار فور قبول الطلب من الجهات المختصة.
          </p>
        </div>

        {/* كارت الحالة الحالية */}
        <div className="bg-white p-6 py-3 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col text-right">
             <span className="text-[10px] text-gray-400 mb-1">الحالة الحالية</span>
             <span className="font-bold text-[#2D8A5B] text-lg">قيد المراجعة</span>
          </div>
          <div className="bg-green-50 p-4 rounded-2xl text-[#2D8A5B]">
            <FaClock className="animate-pulse" size={24} />
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="space-y-4 pt-4">
          <Link 
            href="/home" 
            className="block w-full max-w-md mx-auto bg-[#2D8A5B] hover:bg-[#236b46] text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95"
          >
            العودة للرئيسية
          </Link>
          
          <Link 
            href="/my-requests" 
            className="block w-full max-w-md mx-auto bg-white text-gray-600 py-4 rounded-2xl font-bold text-lg border border-gray-100 hover:bg-gray-50 transition-all"
          >
            متابعة حالة الطلب
          </Link>
        </div>

      </div>
    </div>
  );
}