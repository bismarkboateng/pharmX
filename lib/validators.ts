import { z } from "zod"

export const signUpFormSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
})

export const signInFormSchema = z.object({
    email: z.string().min(2).max(50),
})