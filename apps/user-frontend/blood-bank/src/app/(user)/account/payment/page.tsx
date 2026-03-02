"use client";

import React from 'react';
import {  IoChevronBack, IoAdd } from 'react-icons/io5';
import { MdOutlineAccountBalanceWallet, MdOutlineAccountBalance, MdCreditCard } from 'react-icons/md';
import { RiVisaLine } from 'react-icons/ri';
import { FcSimCardChip } from 'react-icons/fc';
import Link from 'next/link';

const PaymentMethods = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 items-center" dir="rtl">
      <div className="w-full max-w-[60%] mx-auto ">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href={"/account"} className="w-10 h-10 bg-white text-gray-400 rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:text-gray-600">
            <IoChevronBack size={20} />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">طرق الدفع</h1>
          <button className="w-10 h-10 bg-[#34A853] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-colors">
            <IoAdd size={24} />
          </button>
        </div>

        <h3 className="text-gray-400 text-sm mb-6 font-medium">البطاقات المسجلة</h3>

        {/* Cards Slider/Container */}
        <div className="flex items-center justify-center gap-4 overflow-x-auto pb-6 no-scrollbar">
          
          {/* Green Card (Visa Style) */}
          <div className="min-w-[45%] h-[180px] bg-[#2E7D4E] rounded-[24px] p-6 text-white relative flex flex-col justify-between shadow-xl shadow-emerald-100 overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="flex justify-between items-start z-10">
              <div>
                <p className="text-[10px] opacity-60 mb-1">الاسم على البطاقة</p>
                <p className="text-sm font-bold tracking-wide">AHMED MOHAMED</p>
              </div>
              <div className="flex gap-1">
                <div className="w-6 h-4 bg-white/20 rounded-sm"></div>
                <div className="w-6 h-4 bg-white/20 rounded-sm"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center z-10">
              <span className="text-2xl tracking-[0.2em] font-medium">4242  •••• •••• ••••</span>
            </div>

            <div className="flex justify-between items-end z-10">
              <div>
                <p className="text-[10px] opacity-60">تاريخ الانتهاء</p>
                <p className="text-xs">12/26</p>
              </div>
              <RiVisaLine size={45} className="italic" />
            </div>
          </div>

          {/* Black Card (Mastercard Style) */}
          <div className="min-w-[45%] h-[180px] bg-[#2D343C] rounded-[24px] p-6 text-white relative flex flex-col justify-between shadow-xl shadow-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] opacity-60 mb-1">الاسم على البطاقة</p>
                <p className="text-sm font-bold tracking-wide">AHMED MOHAMED</p>
              </div>
              <div className="w-10 h-8 bg-white/10 rounded-md flex items-center justify-center">
                 <FcSimCardChip size={24} className="opacity-80" />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-2xl tracking-[0.2em] font-medium">8812  •••• •••• ••••</span>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] opacity-60">تاريخ الانتهاء</p>
                <p className="text-xs">08/25</p>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-[#EB001B] rounded-full opacity-90"></div>
                <div className="w-8 h-8 bg-[#F79E1B] rounded-full opacity-90"></div>
              </div>
            </div>
          </div>

          
        </div>

        {/* Other Payment Methods */}
        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-50 shadow-sm group cursor-pointer hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#ECFDF5] text-[#34A853] rounded-2xl flex items-center justify-center">
                <MdOutlineAccountBalanceWallet size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-[15px]">المحفظة الإلكترونية</h4>
                <p className="text-xs text-gray-400">فودافون كاش، فوري، إلخ</p>
              </div>
            </div>
            <IoChevronBack size={16} className="text-gray-300" />
          </div>

          <div className="flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-50 shadow-sm group cursor-pointer hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#ECFDF5] text-[#34A853] rounded-2xl flex items-center justify-center">
                <MdOutlineAccountBalance size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-[15px]">تحويل بنكي</h4>
                <p className="text-xs text-gray-400">عبر رقم الحساب أو IBAN</p>
              </div>
            </div>
            <IoChevronBack size={16} className="text-gray-300" />
          </div>
        </div>

        {/* Add New Card Button */}
        <button className="w-full bg-[#34A853] text-white py-4 rounded-2xl font-bold mt-10 flex items-center justify-center gap-2 hover:bg-[#2d8f47] shadow-lg shadow-emerald-100 transition-all">
          <MdCreditCard size={22} />
          إضافة بطاقة جديدة
        </button>

        {/* Footer Text */}
        <p className="text-[13px] text-gray-400 text-center mt-8 leading-relaxed max-w-xs mx-auto">
          يتم تشفير جميع بيانات بطاقتك وتأمينها وفقاً لأعلى معايير الأمان العالمية.
        </p>

      </div>
    </div>
  );
};

export default PaymentMethods;