import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {  useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema, TLogin } from "../schema/auth.schema";
import { loginApi } from "../services/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    const router = useRouter();
    
  const formMethods = useForm<TLogin>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema)
  });


    const mutation = useMutation({
        mutationFn : loginApi,
        onSuccess: (res) => {
            localStorage.setItem("token", res.data.token);
            toast.success('تم تسجيل الدخول بنجاح!');
            router.push('/home');
        },
        onError: (err : any) => {
            toast.error(err?.response?.data?.message || "بيانات غير صحيحة");;
        }
    })

    const onSubmit = formMethods.handleSubmit((data) => {
        mutation.mutate(data)
    })

const loading = mutation.isPending;

    return{
        ...formMethods,
        onSubmit,
        loading
    }
}