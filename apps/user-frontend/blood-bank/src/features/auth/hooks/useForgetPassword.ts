import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import {  useForm } from "react-hook-form"
import { toast } from "sonner";
import { forgetSchema, TForget } from "../schema/auth.schema";
import { forgetPasswordApi } from "../services/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useForgetPassword = () => {
    const router = useRouter();

    const formMethods = useForm<TForget>({
        mode: 'onChange',
        resolver: zodResolver(forgetSchema)
    })

const mutation = useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: (_, variables) => {
        router.push(`/resetPassword?email=${variables.email}`);
        toast.success('تم إرسال الكود');
    },
    onError: (err: any) => {
        toast.error(' حدث خطأ ما حاول مره اخري');
    }
})

    const onSubmit = formMethods.handleSubmit((data) => {
        mutation.mutate(data)
    })

    const loading = mutation.isPending;

    return {
        ...formMethods,
        onSubmit,
        loading
    }
}


