import React from 'react';
// استيراد الأيقونات من مكتبات مختلفة داخل React Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineReceiptLong, MdOutlineSecurity, MdPayment } from "react-icons/md";
import { HiOutlineWallet } from "react-icons/hi2";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import Link from 'next/link';

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10" dir="rtl">
      <div className="max-w-[96%] mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-[#1e293b]">الدفع</h1>
          <button className="p-2 hover:bg-gray-200 rounded-full transition-all">
            <IoIosArrowBack className="text-2xl text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Column: Payment Form (8 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className=" rounded-3xl  ">
              <div className="flex items-center gap-2 mb-8">
                <HiOutlineWallet className="text-emerald-600 text-2xl" />
                <h2 className="font-bold text-lg text-slate-800">طريقة الدفع</h2>
              </div>

              {/* Selected Payment Method Card */}
              <div className="border-2 border-emerald-500 bg-emerald-50/30 rounded-2xl p-4 flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-100/50 p-3 rounded-xl text-emerald-700">
                    <MdPayment className="text-2xl" />
                  </div>
                  <div className='flex gap-2'>
                    <span className="font-bold text-slate-800 block">دفع إلكتروني</span>
                    <div className="flex gap-1 mt-1">
                       <div className="w-8 h-5 bg-[#ff5f00] rounded-xl flex items-center justify-center text-[8px] text-white font-bold italic">MC</div>
                       <div className="w-8 h-5 bg-[#1a1f71] rounded-xl flex items-center justify-center text-[8px] text-white font-bold italic font-serif">VISA</div>
                    </div>
                  </div>
                </div>
                <BsCheckCircleFill className="text-emerald-500 text-xl" />
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-start ps-5 gap-2 text-emerald-600 bg-[#f0fdf4] py-2 rounded-t-xl text-sm font-medium border-b border-emerald-100">
                <MdOutlineSecurity className="text-lg" />
                <span>آمن ومشفر 100%</span>
              </div>

              {/* Form Details */}
              <div className="bg-white p-6 rounded-b-2xl border border-t-0 border-emerald-50 space-y-6">
                <h3 className=" font-bold text-slate-800 mb-6">بيانات البطاقة البنكية</h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-md text-gray-500 mb-2 font-bold">رقم البطاقة</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-gray-50 border-none p-4 rounded-xl text-left tracking-widest focus:ring-2 focus:ring-emerald-500 outline-none" 
                      />
                      {/* <MdPayment className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl" /> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-md font-bold text-gray-500 mb-2">تاريخ الانتهاء</label>
                      <input 
                        type="date" 
                        placeholder="YY / MM"
                        className="w-full bg-gray-50 border-none p-4 rounded-xl text-center focus:ring-2 focus:ring-emerald-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="flex items-center  justify-start gap-1 text-md font-bold text-gray-500 mb-2">
                         رمز التحقق (CVV)
                         <AiOutlineInfoCircle className="text-gray-400 cursor-pointer" />
                      </label>
                      <input 
                        type="text" 
                        placeholder="123"
                        className="w-full bg-gray-50 border-none p-4 rounded-xl text-center focus:ring-2 focus:ring-emerald-500 outline-none" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-md font-bold text-gray-500 mb-2 text-right">اسم حامل البطاقة</label>
                    <input 
                      type="text" 
                      placeholder="الاسم كما يظهر على البطاقة"
                      className="w-full bg-gray-50 border-none p-4 rounded-xl text-right focus:ring-2 focus:ring-emerald-500 outline-none" 
                    />
                  </div>
                </div>

              </div>
                <p className="text-[11px] text-gray-400 text-center pt-4">
                  بالضغط على إتمام الدفع، أنت توافق على <span className="underline hover:text-emerald-600 cursor-pointer">شروط الاستخدام</span> و <span className="underline hover:text-emerald-600 cursor-pointer">سياسة الخصوصية</span>
                </p>
            </div>
          </div>

          {/* Left Column: Summary (4 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Total Amount Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm -600 text-center overflow-hidden">
              <p className="text-gray-400 text-sm mb-2 font-medium">المبلغ الإجمالي المستحق</p>
              <div className="text-5xl font-black text-emerald-600 flex items-baseline justify-center gap-2">
                450 <span className="text-2xl font-bold">جنيه</span>
              </div>
            </div>

            {/* Order Summary Card */}
              <div className="flex items-center gap-2 mb-2 border-b border-gray-50 pb-2">
                <MdOutlineReceiptLong className="text-emerald-600 text-2xl" />
                <h2 className="font-bold text-lg text-slate-800">ملخص الطلب</h2>
              </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">رقم الطلب</span>
                  <span className="text-slate-700 font-bold">#ORD-2023-88</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">فصيلة الدم</span>
                  <span className="bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-sm font-black ring-1 ring-emerald-100">O+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">الكمية</span>
                  <span className="text-slate-700 font-bold   underline-offset-4">2 كيس</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">المستشفى</span>
                  <span className="text-slate-700 font-bold">مستشفى الشفاء</span>
                </div>
              </div>
            </div>

            {/* Final Action Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-gray-100">
               <div className="flex justify-between items-center mb-6 px-2">
                  <div className="flex items-center gap-1">
                    <span className="text-md font-bold text-gray-400">الإجمالي شامل الضريبة</span>
                  </div>
                  <span className="text-lg font-black text-slate-800 italic">450 ج.م</span>
               </div>
               <Link href={'/confirmation'} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-200 active:scale-95 group">
                  <span className="text-lg">إتمام الدفع</span>
                  <BsCheckCircleFill className="text-xl  " />
               </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentPage;