import React from "react";
import { IoTimeOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaHospital } from "react-icons/fa";
import { MdOutlineBloodtype } from "react-icons/md";
import { Order } from "@/types/requests";

const OrderCard = ({ order }: { order: Order }) => {
  const isNegative = order.bloodType.includes('-');

// تعريف متغيرات الحالة
  const isUrgent = order.status === 'عاجل جداً';
  const isProcessing = order.status === 'جاري المعالجة';
  const isGetready = order.status === 'جاري التجهيز';
  const isDelivered = order.status === 'تم التسليم';
  const isNormal = order.status === 'عادي';

  // تحديد الكلاسات بناءً على الحالة
  const getStatusStyles = () => {
    if (isUrgent) return "bg-red-50 text-red-500";
    if (isProcessing) return "bg-orange-50 text-orange-500"; // اللون الأصفر/البرتقالي
    if (isGetready) return "bg-blue-50 text-blue-500"; // الافتراضي (عادي)
    if (isDelivered) return "bg-[#eafdf5] text-blue-500"; // الافتراضي (عادي)
    return "bg-blue-50 text-blue-500"; // الافتراضي (عادي)
  };

  const getStatusIcon = () => {
    if (isUrgent) return "! عاجل جداً";
    if (isProcessing) return "⏳ جاري المعالجة";
    if (isGetready) return "⏳ قيد التجهيز";
    if (isDelivered) return "تم التسليم";
    return "● عادي";
  };


  
  return (
    <div className="bg-white rounded-[32px] p-6 border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
      
      {/* التوقيت والحالة */}
      <div className="flex justify-between items-center mb-6">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusStyles()}}`}>
          {getStatusIcon()}
        </span>
        <div className="flex items-center gap-1 text-gray-400 text-[10px]">
          <IoTimeOutline size={14} />
          <span>{order.time}</span>
        </div>
      </div>

      {/* بيانات المريض والفصيلة */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 text-right">
          <h3 className="font-bold text-gray-800 mb-1">{order.patientName}</h3>
          <div className="flex items-center justify-start gap-1 text-gray-400 text-xs mb-1">
            <FaHospital color="#1447e6" size={18} />
            <span>{order.hospitalName}</span>
          </div>
          <div className="flex items-center justify-start gap-1 text-gray-400 text-xs">
            <MdOutlineBloodtype color="#1447e6" size={18} />
            <span>عدد الأكياس: {order.bagsCount}</span>
          </div>
        </div>
        
        {/* مربع فصيلة الدم */}
        <div className={`w-16 h-20 rounded-2xl flex flex-col items-center justify-center ${
          isNegative ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
        }`}>
          <span className="text-[10px]">فصيلة</span>
          <span className="text-xl font-black">{order.bloodType}</span>
        </div>
      </div>

      {/* أزرار التحكم */}
      <div className="flex gap-3 mt-4">
        {(() => {
            if (order.status === 'تم التسليم') {return (
                <button disabled={true} className="flex-[2] bg-[#3B71F3] text-white py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 
             disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none
             hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    <IoCheckmarkCircleOutline size={18} />
                     تم تسليم الفصيله 
                </button> 
                )
            }
            if (order.status === 'جاري التجهيز') {return (
                 <button className="flex-[2] bg-[#3B71F3] text-white py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    <IoCheckmarkCircleOutline size={18} />
                     تحديث الحالة : تم التجهيز
                </button>
                )
            }
            return(
                <>
        <button className="flex-[2] bg-[#3B71F3] text-white py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          <IoCheckmarkCircleOutline size={18} />
          قبول الطلب
        </button>
        <button className="flex-1 bg-gray-50 text-gray-500 py-3 rounded-2xl text-sm font-bold hover:bg-gray-100 transition-all">
          رفض
        </button></>
            )
        })()}
     
      </div>
    </div>
  );
};

export default OrderCard;