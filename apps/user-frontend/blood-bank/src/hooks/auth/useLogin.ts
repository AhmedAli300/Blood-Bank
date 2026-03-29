import { loginSchema, TLogin } from "@/features/auth/validtion/validLogin";
import axiosInstance from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const useLogin = () => {
      const router = useRouter();
    
  const formMethods = useForm<TLogin>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema)
  });

  const { reset } = formMethods;

const onSubmit: SubmitHandler<TLogin> = async (data) => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        toast.success('تم تسجيل الدخول بنجاح! جاري تحويلك...');
        reset(); // بنصفر الفورم بس لما التأكيد ينجح
        setTimeout(() => {
            router.push('/home');
        }, 2000);

    } catch (error :  any) {
      toast.error('عذراً، حدث خطأ في الاتصال بالسيرفر');
    }
};

    return{
        ...formMethods,
        onSubmit
    }
}