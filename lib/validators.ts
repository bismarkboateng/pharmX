import { z } from "zod"

export const signUpFormSchema = z.object({
    name: z.string().min(2,
        "name must be at least two characters"
    ).max(100, "name must cannot be more than 50 characters"),
    email: z.string().email("invalid email address"),
    address: z.string().min(2).max(50),
    contact: z.string(),
    age: z.string(),
    location: z.string(),
    id_number: z.string(),
})

export const signInFormSchema = z.object({
    email: z.string().email("invalid email address")
})

export const registerPharmacySchema = z.object({
    name: z.string().min(2, "must be at least 2 characters")
    .max(50, "must be less than 50 characters"),
    email: z.string().email("invalid email address"),
    license: z.string().min(2, "must be at least 2 characters")
    .max(100, "must be less than 100 characters"),
    experience_level: z.string().min(1, "must be at least 1 characters")
    .max(20, "must be less than 20 characters"),
    phone: z.string().min(2, "must be at least 2 characters")
    .max(50, "must be less than 50 characters"),
    address: z.string().min(2, "must be at least 2 characters")
    .max(80, "must be less than 80 characters"),
   
    pharmacy_name: z.string().min(2, "must be at least 2 characters")
    .max(50, "must be less than 50 characters"),
    pharmacy_location: z.string().min(2, "must be at least 2 characters")
    .max(50, "must be less than 50 characters"),
    working_hours: z.string().min(2, "must be at least 2 characters")
    .max(1000, "must be less than 1000 characters"),
    pharmacy_address: z.string().min(2, "must be at least 2 characters")
    .max(100, "must be less than 100 characters"),
    pharmacy_email: z.string().email("invalid email address"),
    description: z.string().min(2, "must be at least 2 characters")
    .max(400, "must be less than 400 characters"),
})


export const addProductSchema = z.object({
    name: z.string().min(2).max(250),
    description: z.string().min(2).max(500),
    category: z.string().min(2).max(100),
    price: z.string().min(2).max(250),
    stock_quantity: z.string().min(2).max(100),
    require_prescription: z.boolean(),
    expiry_date: z.string().min(2).max(250),
})

export const settingsFormSchema = z.object({
    name: z.string().min(2).max(250),
    location: z.string().min(2).max(250),
    address: z.string().min(2).max(250),
    email: z.string().min(2).max(250),
})

export const customerFormSchema = z.object({
    age: z.string().min(2).max(50),
    location: z.string().min(2).max(50),
    ID: z.string().min(2).max(50),
    contact: z.string().min(2).max(50),
    address: z.string().min(2).max(50),
})
  

export const billingFormSchema = z.object({
    recipient_address: z.string()
     .min(2, "must be at least 2 characters")
     .max(50, "must be less than 50 characters"),
    recipient_contact: z.string()
     .min(2, "must be at least 2 characters")
     .max(50, "must be less than 50 characters")
})

export const preProcessText = (text: any) => {
    let pre_process_text: any
    pre_process_text = text.toLowerCase();
    pre_process_text = pre_process_text.replace(/[^a-z0-9\s]/g, '');

    return pre_process_text
}

export const tokenizeText = (text: any) => {
    return text.split(" ")
}