"use client";
import Link from 'next/link';
// استيراد الأيقونات
import { BiEnvelope } from 'react-icons/bi';
import LoginGreen from './LoginGreen';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForgetPassword } from '../hooks/useForgetPassword';
import { Spinner } from '@/components/ui/spinner';


export default function ForgetPassword() {

  const { 
        register, 
         loading,
        formState: { errors }, 
        onSubmit, 
      } = useForgetPassword();


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
            <Link href={"forgetPassword"} className="flex-1 text-center pb-4 text-(--primary-color) font-bold border-b-2 border-(--primary-color) transition-all">
               نسيت كلمة المرور
            </Link>
            <Link href={"register"} className="flex-1 text-center pb-4 text-gray-300 hover:text-gray-500 transition-all">
              إنشاء حساب
            </Link>
          </div>

          <form
           onSubmit={onSubmit} 
           className="space-y-6">
            {/* البريد الإلكتروني */}
            <Field className="space-y-1">
              <FieldLabel className="text-xs font-bold text-gray-500 mr-1">أدخل البريد الإلكتروني الخاص بك</FieldLabel>
              <div className="relative group flex items-center justify-center">
                <Input 
                  type="email" 
                  placeholder="example@mail.com" 
                  className="w-full p-2 py-5 pr-11 mt-1 bg-gray-50 border border-gray-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-(--primary-color)/20 focus-visible:border-(--primary-color) outline-none transition-all" 
                  {...register('email', {required: true})}
                />
                <BiEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-(--primary-color)" />
              </div>
              {errors.email && (
                <p className="text-red-500 font-medium text-xs  mr-1 animate-in fade-in slide-in-from-top-1">
                  * {errors.email.message}
                </p>
              )} 
            </Field>

            

         

          
<Button disabled={loading}   variant="secondary" size="lg" className="w-full bg-(--primary-color) hover:bg-(--primary-brand) text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/10 group">
              {loading ?  (<span className="flex items-center gap-2"> <Spinner />جاري  التأكيد </span> ) : ("تأكيد") }

                </Button>
            {/* زر تسجيل الدخول */}
            {/* <Link href={"resetPassword"} className="w-full bg-(--primary-color) hover:bg-(--primary-brand) text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/10 group">
             تأكيد
            </Link> */}
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
