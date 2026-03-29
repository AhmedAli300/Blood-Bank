import z from "zod";

export const forgetSchema = z.object({
    email : z.string().min(3, {message: 'أدخل اميلا صحيحا'}).email({message: 'Email is not vaild'}),
   
})

export type TForget = z.infer<typeof forgetSchema>