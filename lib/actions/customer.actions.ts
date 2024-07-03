"use server"

import { connectToDatabase } from "../database"
import Customer from "../database/models/customer.model"
import Pharmacist from "../database/models/pharmacist.model"
import { cookies } from "next/headers"


type FormData = {
    name: string,
    email: string,
    password: string
}

export const setUserRole = async (role: string) => {
    await cookies().set("role", role)
}

export const getUserRole = async () => {
    const cookie = await cookies().get("role")
    if (cookie) return cookie.value
}

export const setUserId = async (id: string) => {
    await cookies().set("role", id)
}

export const getUserId = async () => {
    const cookie = await cookies().get("id")
    if (cookie) return cookie.value
}
export const createUser = async (formData: FormData, role: string) => {
    try {
        await connectToDatabase()
        if (role == "customer") {
            const customer = await Customer.create(formData)
            if (!customer) {
                return JSON.stringify({ error: "could not create customer"})
            }
            return JSON.stringify({ success: "customer created"})
        } else if (role == "pharmacist") {
            const pharmacist = await Pharmacist.create(formData)
            if (!pharmacist) {
                return JSON.stringify({ error: "could not create pharmacist"})
            }
            return JSON.stringify({ success: "pharmacist created"})
        }
    } catch (error) {
       return JSON.stringify({ error: "error encountered while creating user"})
    }
}

export const checkUserByEmail = async (email: string, role: string) => {
    try {
        await connectToDatabase()

        if (role == "customer") {
            const customer = await Customer.findOne({ email: email })
            if (!customer) {
                return JSON.stringify({ isExist: false })
            }
            return JSON.stringify({ isExist: true , customer: customer })
        } else if (role == "pharmacist") {
            const pharmacist = await Pharmacist.findOne({ email: email })
            if (!pharmacist) {
                return JSON.stringify({ isExist: false })
            }
            return JSON.stringify({ isExist: true , pharmacist: pharmacist })
        }

    } catch (error) {
        return JSON.stringify({ error: "error encountered while fetching user"})
    }
}