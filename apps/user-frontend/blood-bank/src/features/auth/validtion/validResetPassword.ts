import z from "zod";

export const resetPasswordSchema = z.object({
    // كود التحقق (OTP) - غالباً بيكون 6 أرقام
    otp: z
        .string()
        .min(6, { message: "كود التحقق يجب أن يكون 6 أرقام" })
        .max(6, { message: "كود التحقق لا يزيد عن 6 أرقام" }),

    // كلمة المرور الجديدة
    password: z
        .string()
        .min(8, { message: "يجب إدخال 8 أحرف على الأقل" })
        .max(20, { message: "يجب ألا تزيد كلمة السر عن 20 حرفاً" }),

    // تأكيد كلمة المرور
    confirm_password: z
        .string()
        .min(1, { message: "يرجى تأكيد كلمة المرور" }),
})
// هنا بنعمل المقارنة بين الباسورد والتأكيد
.refine((data) => data.password === data.confirm_password, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirm_password"], // عشان الخطأ يظهر عند حقل التأكيد بس
});

export type TResetPassword = z.infer<typeof resetPasswordSchema>;