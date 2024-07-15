import { type ClassValue, clsx } from "clsx"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import { twMerge } from "tailwind-merge"
import { v4 } from "uuid"


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

export const addProductInitialValues = {
  name: "",
  image: "",
  description: "",
  category: "",
  price: "",
  require_prescription: false,
  stock_quantity: "",
  expiry_date: "",
}

export const settingsInitialValues = {
  name: "",
  location: "",
  address: "",
  email: "",
}

export const customerFormInitialValues = {
  age: "",
  location: "",
  ID: "",
  contact: "",
  address: "",
}

export const uploadImageToFirebase = async (type: string, fileToUpload: any) => {
  let uploadedUrl = ""
  
  try {

    let fileRef
    
    if (type === "drugs") {
      fileRef = ref(storage, `drugs/${fileToUpload.name + v4()}`);
    } else if (type === "profile") {
      fileRef = ref(storage, `profile/${fileToUpload.name + v4()}`);
    } else if (type === "pharmacy") {
      fileRef = ref(storage, `pharmacy/${fileToUpload.name + v4()}`)
    } else if (type === "prescription") {
      fileRef = ref(storage, `prescription/${fileToUpload.name + v4()}`)
    }

    const snapshot = await uploadBytes(fileRef!, fileToUpload);

    uploadedUrl = await getDownloadURL(snapshot.ref);

  } catch (error: any) {
    throw new Error(`Error uploading file to firebase: ${error.message}`)
  }

  return uploadedUrl
}