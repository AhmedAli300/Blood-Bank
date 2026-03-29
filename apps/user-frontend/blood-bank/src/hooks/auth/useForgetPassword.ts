import { forgetSchema, TForget } from "@/features/auth/validtion/validForgetPassword"
import axiosInstance from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner";

export const useForgetPassword = () => {
    const router = useRouter();
    const formMethods = useForm<TForget>({
        mode: 'onChange',
        resolver: zodResolver(forgetSchema)
    })
    const { reset } = formMethods;


    const onSubmit: SubmitHandler<TForget> = async (data) => {
        try {
            const response = await axiosInstance.post('/auth/forgot-password', data);
            toast.success('تم إرسال رمز التحقيق  ! جاري تحويلك...');
            reset(); // بنصفر الفورم بس لما التأكيد ينجح
            setTimeout(() => {
                router.push('/resetPassword');
            }, 2000);
        } catch (error) {
            console.log(error);
            
            toast.error('عذراً، حدث خطأ في الاتصال بالسيرفر');
        }
    };
    return {
        ...formMethods,
        onSubmit
    }
}


