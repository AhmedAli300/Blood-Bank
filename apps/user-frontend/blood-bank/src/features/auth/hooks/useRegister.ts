// hooks/useRegister.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { registerSchema, TRegist } from '../schema/auth.schema';
import { registerApi } from '../services/auth.api';
import { useMutation } from "@tanstack/react-query";
export const useRegister = () => {
  const router = useRouter();

  const formMethods = useForm<TRegist>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema)
  });



const mutation = useMutation({
    mutationFn : registerApi,
    onSuccess: (res) => {
      toast.success('تم إنشاء الحساب بنجاح ');
      formMethods.reset()
      router.push('/login');
      console.log(res);
      
    },
    onError: (error:any) => {
      console.log(error);
      
      toast.error(error.response.data.message || " هذا الاميل موجود بالفعل");
    }
})

  const onSubmit = formMethods.handleSubmit(
    (data) => {
    console.log("data......" , data);
    
    mutation.mutate(data)
  },

  (erroes) => {
    console.log('validation' , erroes);
    
  }
)

const loading = mutation.isPending;

  return {
    ...formMethods, // بيرجع register, handleSubmit, errors, 
    onSubmit,
    loading,
  };
};