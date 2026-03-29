import { resetPasswordSchema, TResetPassword } from "@/features/auth/validtion/validResetPassword";
import axiosInstance from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const useResetPasword = () => {
    const router = useRouter();

    const formMethods = useForm<TResetPassword>({
        mode: 'onChange',
        resolver: zodResolver(resetPasswordSchema)
    })
    const {reset} = formMethods
    const onSubmit: SubmitHandler<TResetPassword> = async (data) => {
        try {
            const response = await axiosInstance.post('/auth/reset-password', data);
            toast.success('تم تغير كلمة المرور  ! جاري تحويلك...');
            reset(); // بنصفر الفورم بس لما التأكيد ينجح
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error) {
            console.log(error);
            
            toast.error('عذراً، حدث خطأ في  تغير كلمة المرور');
        }

    }

    return{
        ...formMethods,
        onSubmit
    }
}