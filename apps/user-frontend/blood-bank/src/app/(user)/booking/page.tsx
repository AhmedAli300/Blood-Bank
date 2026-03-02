
"use client";
import { FaPlus, FaMinus, FaRegCheckCircle, FaCloudUploadAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import {  FaFileAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function BookingPage() {
  const [selectedType, setSelectedType] = useState("A+");
  const [quantity, setQuantity] = useState(3);
  const bloodTypes = [  "A+","A-", "B+", "B-",  "O+", "O-" , "AB+" , "AB-"];

  // السعر الافتراضي للكيس الواحد بناءً على الصورة (1350 / 3 = 450)
  const pricePerBag = 450; 
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // إذا كان الملف صورة، ننشئ رابط للمعاينة
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null); // لو ملف PDF مثلاً
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  }; 

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-tajawal text-right" dir="rtl">
     

      <main className="w-full max-w-[93%] mx-auto p-4 md:p-8 space-y-8">
        
        {/* 1. اختيار الفصيلة */}
        <section>
          <h2 className="font-bold text-gray-800 mb-4 px-2 text-xl">اختر فصيلة الدم</h2>
          <div className="grid grid-cols-4 gap-3 ">
            {bloodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`py-4 rounded-xl font-bold border-2 transition-all ${
                  selectedType === type 
                  ? "bg-[#2D8A5B] text-white border-[#2D8A5B] shadow-md" 
                  : "bg-white text-gray-600 border-gray-50 hover:border-green-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* 2. عدد الأكياس */}
        <section className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-800">عدد الأكياس المطلوبة</h3>
            <p className="text-xs text-gray-400 mt-1">الحد الأقصى 5 أكياس للطلب الواحد</p>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
            <button 
              onClick={() => setQuantity(q => Math.min(5, q + 1))}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-[#2D8A5B] cursor-pointer"
            >
              <FaPlus />
            </button>
            <span className="text-xl font-bold w-6 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-400 cursor-pointer"
            >
              <FaMinus />
            </button>
          </div>
        </section>

        {/* 3. مرفقات الطلب */}
        <section>
        <h2 className="font-bold text-gray-800 mb-4 px-2">مرفقات الطلب</h2>
        
        {!selectedFile ? (
            <label htmlFor="file-upload" className="cursor-pointer">
            <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 bg-white flex flex-col items-center justify-center text-center group hover:border-[#2D8A5B] transition-colors">
                <div className="bg-green-50 p-4 rounded-full text-[#2D8A5B] mb-4 group-hover:scale-110 transition-transform">
                <FaCloudUploadAlt size={40} />
                </div>
                <p className="font-bold text-gray-700">اضغط لرفع صورة من طلب المستشفى أو التحويل</p>
                <p className="text-xs text-gray-400 mt-2">PDF, PNG, JPG (الحد الأقصى 5MB)</p>
                <input id="file-upload" type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} />
            </div>
            </label>
        ) : (
            // واجهة التأكيد بعد اختيار الملف
            <div className="border-2 border-solid border-green-100 rounded-3xl p-6 bg-green-50/30 flex flex-col items-center relative">
            <button 
                onClick={removeFile}
                className="absolute top-4 left-4 text-red-400 hover:text-red-600 transition-colors"
            >
                <FaTimesCircle size={20} />
            </button>

            {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-xl mb-4 border-2 border-white shadow-sm" />
            ) : (
                <FaFileAlt size={48} className="text-gray-400 mb-4" />
            )}

            <div className="flex items-center gap-2 text-[#2D8A5B] font-bold">
                <FaCheckCircle />
                <span>تم اختيار: {selectedFile.name}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">حجم الملف: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
        )}
        </section>
       
      </main>

      {/* Footer / Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <div className="max-w-[95%] mx-auto flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-xs text-gray-400">ملخص الطلب</span>
             <span className="font-bold text-[#2D8A5B]">{quantity} أكياس ({selectedType})</span>
          </div>
          <div className="text-left flex flex-col items-end">
             <span className="text-xs text-gray-400">الإجمالي المقدر</span>
             <span className="text-xl font-bold text-gray-800">{quantity * pricePerBag} ج.م</span>
          </div>
        </div>
        <div className="max-w-[95%] mx-auto mt-4">
           <Link 
            href="/booking/summary" 
            className="w-full bg-[#2D8A5B] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#236b46] transition-all shadow-lg shadow-green-900/10"
           >
             <FaCheckCircle /> تأكيد الحجز 
           </Link>
        </div>
      </div>
      
      {/* Spacer for sticky footer */}
      <div className="h-40"></div>
    </div>
  );
}