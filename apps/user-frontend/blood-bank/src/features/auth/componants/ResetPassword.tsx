"use client";

import Link from 'next/link';
// استيراد الأيقونات

import LoginGreen from './LoginGreen';
import { Field, FieldLabel } from '@/components/ui/field';
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp"
import { Input } from '@/components/ui/input';
import { BiLockAlt } from 'react-icons/bi';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import { useResetPasword } from '@/hooks/auth/useResetPasword';


export default function ResetPassword() {

    const { 
      register, 
      handleSubmit, 
      control,
      formState: { errors, isSubmitting }, 
      onSubmit, 
    } = useResetPasword();
      
 

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
            <button className="flex-1 text-center pb-4 text-[#2D8A56] font-bold border-b-2 border-[#2D8A56] transition-all">
              رمز التحقيق
            </button>
            <Link href={"register"} className="flex-1 text-center pb-4 text-gray-300 hover:text-gray-500 transition-all">
              إنشاء حساب
            </Link>
          </div>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP*/}
            <Field className="space-y-1">
                {/* <h4 >رمز التحقيق</h4> */}
                <FieldLabel className="text-xs font-bold text-gray-500 mr-1">تم إرسال رمز التحقيق إلي بريدك الإلكتروني example@mail.com</FieldLabel>
                <div dir="ltr" className="flex justify-center"> {/* لازم الـ OTP يفضل ltr عشان الأرقام */}
                  <Controller
                    control={control}
                    name="otp"
                    render={({ field }) => (
                      <InputOTP maxLength={6} value={field.value}  onChange={field.onChange}>
                          <InputOTPGroup className="gap-2"> {/* إضافة gap بتخلي فيه مسافات بين المربعات */}
                          <InputOTPSlot index={0} className="rounded-lg border-2 w-10 h-10 text-lg font-bold" />
                          <InputOTPSlot index={1} className="rounded-lg border-2 w-10 h-10 text-lg font-bold" />
                          <InputOTPSlot index={2} className="rounded-lg border-2 w-10 h-10 text-lg font-bold" />
                          <InputOTPSlot index={3} className="rounded-lg border-2 w-10 h-10 text-lg font-bold" />
                          <InputOTPSlot index={4} className="rounded-lg border-2 w-10 h-10 text-lg font-bold" />
                          <InputOTPSlot index={5} className="rounded-lg border-2 w-10 h-10 text-lg font-bold" />
                          </InputOTPGroup>
                      </InputOTP>
                    )}
                  />
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-2 text-center w-full">
                    * {errors.otp.message}
                  </p>
                )}
            </Field>

            <div className="text-center">
                <h4 className='font-bold text-2xl'>تعين كلمة مرور جديدة</h4>
                <p className='mt-1 font-bold text-gray-500'>يرجي تأكيد كلمة مرور جديدة وتأكيدها للمتابعة</p>
            </div>

              {/* كلمة المرور */}
                <Field className="space-y-1">
                <FieldLabel className="text-xs font-bold text-gray-500 mr-1 mt-2">كلمة المرور الجديدة</FieldLabel>
                <div className="relative group">
                    <Input 
                    type="password" 
                    placeholder="********" 
                    className="w-full p-2 py-5 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#2D8A56]/20 focus-visible:border-[#2D8A56] outline-none transition-all" 
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

                {/* كلمة المرور */}
                <Field className="space-y-1">
                <FieldLabel className="text-xs font-bold text-gray-500 mr-1">تأكيد كلمة المرور الجديدة</FieldLabel>
                <div className="relative group">
                    <Input 
                    type="password" 
                    placeholder="********" 
                    className="w-full p-2 py-5 pr-11 bg-gray-50 border border-gray-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#2D8A56]/20 focus-visible:border-[#2D8A56] outline-none transition-all" 
                    {...register('confirm_password', {required: true})}
                    />
                    <BiLockAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#2D8A56]" />
                </div>
                {errors.confirm_password && (
                  <p className="text-red-500 font-medium text-xs  mr-1 animate-in fade-in slide-in-from-top-1">
                    * {errors.confirm_password.message}
                  </p>
                )} 
                </Field>

            {/* زر تسجيل الدخول */}
            <Button disabled={isSubmitting}   variant="secondary" size="lg" className="w-full !text-white bg-[#2D8A56] hover:bg-[#256f45] cursor-pointer  font-bold py-5 text-md+ rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/10 group">
              {isSubmitting ?  "جاري  التغير" : " تأكيد" }

                
            </Button>
            {/* <Link href={"home"} className="w-full bg-[#2D8A56] hover:bg-[#256f45] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/10 group">
             تأكيد
              {/* <HiOutlineLogin className="text-xl rotate-180 group-hover:-translate-x-1 transition-transform" /> */}
            {/* </Link> */} 
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
