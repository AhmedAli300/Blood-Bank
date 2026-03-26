"use client";

import React, { useState } from 'react';
import { 
  MdNotificationsActive
} from 'react-icons/md';
import { notificationOptions } from '../Alert';
import { Button } from '@/components/ui/button';


export default function Alerts() {
  // 1. حالة لتخزين قيم أزرار التفعيل (Toggle States)
  const [settings, setSettings] = useState({
    rareBlood: true,
    orderUpdates: true,
    medicalOffers: false,
    systemNews: true,
  });

  // 2. دالة لتغيير حالة التنبيه عند الضغط
  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <div className=" bg-gray-50 flex flex-col items-center py-8 px-4">
        {/* أيقونة الجرس العلوية */}
        <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mb-3 text-[#34A853]">
          <MdNotificationsActive size={32} />
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-2">
          إعدادات التنبيهات
        </h1>
        <p className="text-gray-400 text-sm text-center max-w-[250px] mb-5 leading-relaxed">
          تحكم في نوعية الإشعارات التي ترغب في استلامها على هاتفك
        </p>

        {/* قائمة الخيارات */}
        <div className="w-full max-w-xl bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden mb-5">
          {notificationOptions.map((option, index) => {
            const isActive = settings[option.id as keyof typeof settings];
            return (
              <div
                key={option.id}
                className={`flex items-center justify-between p-5  ${
                  index !== notificationOptions.length - 1
                    ? "border-b border-gray-50"
                    : ""
                }`}
              >
                {/* النص والأيقونة */}
                <div className="flex items-center gap-4 text-right">
                  <div className="w-10 h-10 bg-[#F0FDF4] text-[#34A853] rounded-xl flex items-center justify-center">
                    {option.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">
                      {option.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* زر التفعيل (Toggle Switch) */}
                <button
                  onClick={() =>
                    toggleSetting(option.id as keyof typeof settings)
                  }
                  className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    isActive ? "bg-[#34A853]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      isActive ? "translate-x-[-24px]" : "translate-x-[-4px]"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* زر حفظ التغييرات */}
        <Button
          variant="secondary"
          size="lg"
          className="w-full max-w-xl bg-[#34A853] text-white py-6 text-lg rounded-2xl font-bold hover:bg-[#2d8f47] transition-all shadow-lg shadow-emerald-50 active:scale-[0.98]"
          onClick={() => alert("تم حفظ الإعدادات بنجاح!")}
        >
          حفظ التغييرات
        </Button>
      </div>
    </>
  );
}
