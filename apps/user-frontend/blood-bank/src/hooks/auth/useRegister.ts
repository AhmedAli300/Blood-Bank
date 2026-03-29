// hooks/useRegister.ts
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axios';
import { registerSchema, TRegist } from '@/features/auth/validtion/validRegsiter';

export const useRegister = () => {
  const router = useRouter();

  const formMethods = useForm<TRegist>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema)
  });

  const { reset } = formMethods;



  const onSubmit: SubmitHandler<TRegist> = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/register', data);
    
      toast.success('تم إنشاء الحساب بنجاح! جاري تحويلك...');
      reset(); // بنصفر الفورم بس لما التأكيد ينجح
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      console.log(response);
      
      
    } catch (error : any) {
     
    if (error.response) {
      toast.error(error.response.data.message || " هذا الاميل موجود بالفعل");
    } else {
    // مشكلة في الشبكة أو السيرفر واقف خالص
      toast.error("مشكلة في الاتصال بالإنترنت");
    }
  }

};

  return {
    ...formMethods, // بيرجع register, handleSubmit, errors, 
    onSubmit,
  };
};