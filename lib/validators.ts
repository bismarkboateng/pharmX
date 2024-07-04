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
    bio: z.string().min(2).max(1000)
})

export const pharmacySchema = z.object({
    pharmacy_name: z.string().min(2).max(50),
    pharmacy_location: z.string().min(2).max(50),
    working_hours: z.string().min(2).max(100),
    pharmacy_address: z.string().min(2).max(100),
    pharmacy_email: z.string().email(),
    description: z.string().min(2).max(400),
})