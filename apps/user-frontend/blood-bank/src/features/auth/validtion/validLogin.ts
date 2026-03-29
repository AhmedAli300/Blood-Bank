import z from "zod";

export const loginSchema = z.object({
    email : z.string().min(3, {message: 'أدخل اميلا صحيحا'}).email({message: 'Email is not vaild'}),
    password : z.string().min(6, {message: "يجب إدخال 6 أحرف علي الاقل"})
        .max(20, {message: 'يجب الا يزيد كلمة السر عن 21 حرفا'})
})

export type TLogin = z.infer<typeof loginSchema>