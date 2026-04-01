import { isValidPhoneNumber } from "react-phone-number-input";
import z from "zod";

// Start Regsiter
export const registerSchema = z
  .object({
    name: z.string().min(3, { message: "الاسم قصير" }),
    email: z.string().email({ message: "Email غير صحيح" }),
    phone: z.string().refine((val) => val && isValidPhoneNumber(val), {
      message: "رقم غير صحيح",
    }),

    password: z
      .string()
      .min(8, { message: "ضعيفة" })
      .regex(/[A-Z]/, "لازم حرف كبير")
      .regex(/[0-9]/, "لازم رقم")
      .max(20, { message: "يجب الا تزيد كلمة السر عن 20 حرف" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "غير متطابقة",
    path: ["confirm_password"], // عشان الخطأ يظهر عند حقل التأكيد بس
  });

export type TRegist = z.infer<typeof registerSchema>;

// Start Login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type TLogin = z.infer<typeof loginSchema>;

// start Forget
export const forgetSchema = z.object({
  email: z.string().email(),
});

export type TForget = z.infer<typeof forgetSchema>;

// start OTP

export const resetPasswordSchema = z
  .object({
    // كود التحقق (OTP) - غالباً بيكون 6 أرقام
    otp: z.string().length(6),

    // كلمة المرور الجديدة
    password: z
      .string()
      .min(8, "كلمة المرور ضعيفة")
      .regex(/[A-Z]/, "لازم حرف كبير")
      .regex(/[0-9]/, "لازم رقم"),

    // تأكيد كلمة المرور
    confirm_password: z.string(),
  })
  // هنا بنعمل المقارنة بين الباسورد والتأكيد
  .refine((data) => data.password === data.confirm_password, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirm_password"], // عشان الخطأ يظهر عند حقل التأكيد بس
  });

export type TResetPassword = z.infer<typeof resetPasswordSchema>;