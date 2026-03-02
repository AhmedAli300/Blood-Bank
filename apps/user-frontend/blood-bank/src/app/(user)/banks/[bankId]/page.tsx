import React from 'react';
import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineCash, HiOutlineChevronLeft } from 'react-icons/hi';
import { FaRegCheckCircle, FaPlusCircle, FaMapMarkedAlt, FaClock } from 'react-icons/fa';
import { MdOutlineGpsFixed } from 'react-icons/md';
import Image from 'next/image';
import { FaDroplet } from 'react-icons/fa6';
import Link from 'next/link';

const BloodBankCard = () => {
  const bloodTypes = [
    { type: 'A+', bags: 12, status: 'available' },
    { type: 'A-', bags: 5, status: 'available' },
    { type: 'B+', bags: 8, status: 'available' },
    { type: 'B-', bags: 0, status: 'unavailable' },
    { type: 'O+', bags: 2, status: 'available' },
    { type: 'O-', bags: 0, status: 'unavailable' },
    { type: 'AB+', bags: 4, status: 'available' },
    { type: 'AB-', bags: 1, status: 'available' },
  ];

  return (
    <div className="xl:max-w-[93%] mx-auto p-4 font-sans" dir="rtl">
      
      {/* Banner Section */}
      <div className="relative h-56 rounded-2xl overflow-hidden mb-6 shadow-md border border-gray-100">
        <div className="absolute inset-0 bg-gray-400">
          <Image 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
            alt="Building" 
            width={1250} height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
          <div className="flex items-center gap-1 bg-green-600/90 w-fit px-2 py-0.5 rounded-full text-[10px] mb-2">
            <FaRegCheckCircle /> <span>موثوق</span>
          </div>
          <h1 className="text-2xl font-bold">بنك الدم المركزي - الدقي</h1>
          <div className="flex items-center gap-1 text-xs opacity-80 mt-1">
            <HiOutlineLocationMarker /> <span>3.2 كم من موقعك الحالي</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content: Blood Types */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                <FaDroplet className='text-red-500 text-xl' />
                الفصائل المتاحة
              </h2>
              <span className="text-[10px] text-gray-400">تحديث منذ 15 دقيقة</span>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {bloodTypes.map((item, index) => (
                <div 
                  key={index}
                  className={`border-2 rounded-xl p-3  text-center transition-all ${
                    item.status === 'available' 
                    ? 'border-green-600 bg-white cursor-pointer' 
                    : 'border-gray-100 bg-gray-50/50'
                  }`}
                >
                  <div className={`text-lg font-bold ${item.status === 'available' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {item.type}
                  </div>
                  <div className={`text-[10px] mt-1 ${item.status === 'available' ? 'text-gray-500' : 'text-gray-300'}`}>
                    {item.status === 'available' ? `${item.bags} كيس` : 'غير متوفر'}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Map */}
        <div className="space-y-6">
             <h2 className="p-3 py-0 mb-2.5 font-bold text-lg text-gray-700">الموقع والعنوان</h2>
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="h-28 bg-gray-100 relative overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i14!2i9436!3i6364!2m3!1e0!2sm!3i420120488!3m7!2sen!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-center"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="relative">
                      <HiOutlineLocationMarker className="text-green-600 text-4xl" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm"></div>
                   </div>
                </div>
             </div>
             <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <span className="mt-1 bg-black/10 h-fit p-1 rounded-md"><HiOutlineLocationMarker className="text-green-600 text-lg" /></span>
                  <div>
                    <p className="font-bold text-xs text-gray-800 leading-tight">12 شارع التحرير، الدقي، الجيزة</p>
                    <p className="text-[12px] text-gray-400 mt-0.5">بجوار محطة مترو الدقي</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
                  <MdOutlineGpsFixed size={14} /> فتح في خرائط جوجل
                </button>
             </div>
          </section>
        </div>
      </div>

      {/* Footer Info: Hours & Fees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Hours */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
             <span className='bg-black/10 p-1 rounded-md'><FaClock  className="text-green-600 text-lg" /></span> مواعيد العمل
           </h3>
           <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400">السبت - الخميس</span>
                <span className="font-bold text-gray-700 ">9:00 ص - 10:00 م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">الجمعة</span>
                <span className="text-red-500 font-bold">الطوارئ فقط</span>
              </div>
           </div>
        </div>

        {/* Fees */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
             <HiOutlineCash className="text-green-600 text-lg" /> رسوم الخدمة
           </h3>
           <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-medium">رسوم اختبار التوافق</span>
                <span className="text-green-600 font-bold">مجاناً</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">رسوم القربة (حكومي)</span>
                <span className="font-bold text-gray-700">120 ج.م</span>
              </div>
           </div>
        </div>
      </div>

      {/* CTA Button */}
        <div className="flex justify-end w-full"> 
            <Link  href={"/booking"} className="w-fit px-5 mt-6 bg-[#2D8A5B] hover:bg-[#236b46] text-white py-4 rounded-2xl font-bold text-md flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                <FaPlusCircle size={18} />
                احجز كيس دم الآن
            </Link>
        </div>


    </div>
  );
};

export default BloodBankCard;