import { isValidPhoneNumber } from "react-phone-number-input";
import z from "zod";

export const registerSchema = z.object({
    name : z.string().min(3, {message: 'أقل اسم 3 حروف'}).max(20),
    email : z.string().min(3, {message: 'أدخل اميلا صحيحا'}).email({message: 'Email is not vaild'}),
    phone: z
    .string()
    .refine((val) => val && isValidPhoneNumber(val), {
      message: "رقم الهاتف غير صحيح (تأكد من اختيار الدولة الصحيحة)",
    }),
    password : z.string().min(6, {message: "يجب إدخال 6 أحرف علي الاقل"})
    .max(20, {message: 'يجب الا يزيد كلمة السر عن 21 حرفا'})
})


export type TRegist = z.infer<typeof registerSchema>