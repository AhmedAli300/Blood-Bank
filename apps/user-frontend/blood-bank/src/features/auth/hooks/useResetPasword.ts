// import { resetPasswordSchema, TResetPassword } from "@/features/auth/schema/validResetPassword";
import axiosInstance from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { resetPasswordSchema, TResetPassword } from "../schema/auth.schema";
import { resetPasswordApi } from "../services/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get("email");


    const formMethods = useForm<TResetPassword>({
        mode: 'onChange',
        resolver: zodResolver(resetPasswordSchema)
    })

    const mutation = useMutation({
        mutationFn :resetPasswordApi,
        onSuccess : () =>{
            toast.success('تم تغير كلمة المرور ');
            router.push('/successCard');
        },
        onError: (err:any) => {
            toast.error('عذراً، حدث خطأ في  تغير كلمة المرور');
        }
    })

    const onSubmit = formMethods.handleSubmit((data) => {
    mutation.mutate({...data, email})
  })

  const loading = mutation.isPending;



    return{
        ...formMethods,
        onSubmit,
        loading

    }
}