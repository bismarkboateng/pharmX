import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const signUpFormInitialValues = {
  name: "",
  email: "",
}

export const pharmacistInitialValues = {
  name: "",
  email: "",
  license: "",
  experience_level: "",
  phone: "",
  address: "",
  bio: "",
}

export const pharmacyInitialValues = {
  pharmacy_name: "",
  pharmacy_location: "",
  working_hours: "",
  pharmacy_address: "",
  pharmacy_email: "",
  description: "",
}