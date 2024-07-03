import { z } from "zod"

export const signUpFormSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
})

export const signInFormSchema = z.object({
    email: z.string().min(2).max(50),
})

export const pharmacistSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    license: z.string().min(2).max(100),
    experience_level: z.string().min(2).max(20),
    phone: z.string().min(2).max(150),
    address: z.string().min(2).max(80),
})