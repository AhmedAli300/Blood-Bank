import Link from 'next/link';
// استيراد الأيقونات
import {  BiLockAlt } from 'react-icons/bi';
import { HiOutlineLogin } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
import LoginGreen from './LoginGreen';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';


export default function ResetAccountPassword() {
  return (
    <>
         <div className="min-h-screen bg-[#F0F7F3] flex items-center justify-center p-4 font-sans" dir="rtl">
      <div className="bg-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full border border-gray-100">
        
        {/* الجانب الأيمن (الأخضر) */}
       
        <LoginGreen/>

        {/* الجانب الأيسر (الفورم) */}
        <div className="md:w-2/3  p-8 md:p-14 md:py-8 bg-white">
          {/* التبويبات */}
            <div className="flex border-b border-gray-100 mb-10 relative ">
                <Link href={"login"} className="flex-1 text-center pb-4 text-(--primary-color) font-bold border-b-2 border-(--primary-color) transition-all">
                إعادة تعين كلمة المرور
                </Link>
                <Link href={"register"} className="flex-1 text-center pb-4 text-gray-300 hover:text-gray-500 transition-all">
                إنشاء حساب
                </Link>
            </div>

            <div className="text-center">
                <h4 className='font-bold text-2xl'>تعين كلمة مرور جديدة</h4>
                <p className='mt-1 font-bold text-gray-500'>يرجي تأكيد كلمة مرور جديدة وتأكيدها للمتابعة</p>
            </div>

            <form className="space-y-6">
            

                {/* كلمة المرور */}
                <Field className="space-y-1">
                <FieldLabel className="text-xs font-bold text-gray-500 mr-1 mt-2">كلمة المرور الجديدة</FieldLabel>
                <div className="relative group">
                    <Input 
                    type="password" 
                    placeholder="********" 
                    className="w-full p-2 py-5 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-(--primary-color)/20 focus-visible:border-(--primary-color) outline-none transition-all" 
                    />
                    <BiLockAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-(--primary-color)" />
                </div>
                </Field>

                {/* كلمة المرور */}
                <Field className="space-y-1">
                <FieldLabel className="text-xs font-bold text-gray-500 mr-1">تأكيد كلمة المرور الجديدة</FieldLabel>
                <div className="relative group">
                    <Input 
                    type="password" 
                    placeholder="********" 
                    className="w-full p-2 py-5 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-(--primary-color)/20 focus-visible:border-(--primary-color) outline-none transition-all" 
                    />
                    <BiLockAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-(--primary-color)" />
                </div>
                </Field>

             

                {/* زر تسجيل الدخول */}
                <Link href={"successCard"} className="w-full bg-(--primary-color) hover:bg-(--primary-brand) text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/10 group">
                تحديث كلمة المرور
                <HiOutlineLogin className="text-xl rotate-180 group-hover:-translate-x-1 transition-transform" />
                </Link>
            </form>
            <Link href={"login"} className='text-center w-full text-(--primary-color) font-bold flex items-center justify-center mt-2'><IoIosArrowBack className='font-bold'/>العودة لتسجيل الدخول</Link>
        </div>
      </div>
    </div>
    </>
  )
}
