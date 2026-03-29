"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// استيراد الأيقونات
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';
import { HiOutlineLogin } from 'react-icons/hi';
import LoginGreen from './LoginGreen';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { useLogin } from '@/hooks/auth/useLogin';

export default function Login() {
      const { 
      register, 
      handleSubmit, 
      formState: { errors, isSubmitting }, 
      onSubmit, 
    } = useLogin();
      
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
            <Link href={"login"} className="flex-1 text-center pb-4 text-[#2D8A56] font-bold border-b-2 border-[#2D8A56] transition-all">
              تسجيل الدخول
            </Link>
            <Link href={"register"} className="flex-1 text-center pb-4 text-gray-300 hover:text-gray-500 transition-all">
              إنشاء حساب
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* البريد الإلكتروني */}
            <Field className="space-y-1">
              <FieldLabel className="text-xs font-bold text-gray-500 mr-1">البريد الإلكتروني</FieldLabel>
              <div className="relative group">
                <Input 
                  type="email" 
                  placeholder="example@mail.com" 
                  className="w-full p-2 py-5 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#2D8A56]/20 focus-visible:border-[#2D8A56] outline-none transition-all" 
                  {...register('email', {required: true})}
                />
                <BiEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
              </div>
               {errors.email && (
                <p className="text-red-500 font-medium text-xs  mr-1 animate-in fade-in slide-in-from-top-1">
                  * {errors.email.message}
                </p>
              )} 
            </Field>

            {/* كلمة المرور */}
            <Field className="space-y-1">
              <FieldLabel className="text-xs font-bold text-gray-500 mr-1">كلمة المرور</FieldLabel>
              <div className="relative group">
                <Input 
                  type="password" 
                  placeholder="********" 
                  className="w-full p-2 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#2D8A56]/20 focus-visible:border-[#2D8A56] outline-none transition-all" 
                  {...register('password', {required: true})}
                />
                <BiLockAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
              </div>
               {errors.password && (
                <p className="text-red-500 font-medium text-xs  mr-1 animate-in fade-in slide-in-from-top-1">
                  * {errors.password.message}
                </p>
              )} 
            </Field>

            {/* روابط إضافية (تذكرني + نسيت كلمة المرور) */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-[#2D8A56] focus:ring-[#2D8A56]" />
                <FieldLabel htmlFor="remember" className="text-xs text-gray-400 font-medium cursor-pointer">تذكرني</FieldLabel>
              </div>
              <Link href="forgetPassword" className="text-xs text-[#2D8A56] font-bold hover:underline">هل نسيت كلمة المرور؟</Link>
            </div>

            {/* زر تسجيل الدخول */}
            <Button disabled={isSubmitting}   variant="secondary" size="lg" className="w-full !text-white bg-[#2D8A56] hover:bg-[#256f45] text-white font-bold py-5 text-md+ rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/10 group">
              {isSubmitting ?  "جاري  التسجيل" : " تسجيل الدخول" }

                {/* <Link href={"home"}  className='text-white'> */}
                {/* تسجيل الدخول */}
                <HiOutlineLogin className="text-xl rotate-180 group-hover:-translate-x-1 transition-transform" />
                {/* </Link> */}
            </Button>
          </form>
        </div>
      </div>
    </div>
        </>
    )
}
