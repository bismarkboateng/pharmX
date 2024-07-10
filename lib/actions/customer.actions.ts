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

type UpdateCustomerParams = {
    address: string;
    age: string;
    contact: string;
    location: string;
    ID: string;
    image: string;
}

// user role in cookie

export const setUserRole = async (role: string) => {
    await cookies().set("role", role)
}

export const getUserRole = async () => {
    const cookie = await cookies().get("role")
    if (cookie) return cookie.value
}

export const clearUserRole = async () => {
    await cookies().delete("role")
}

// user id's in cookie
export const setUserId = async (id: string) => {
    await cookies().set("userId", id)
}

export const getUserId = async () => {
    const cookie = await cookies().get("userId")
    if (cookie) return cookie.value
}

export const clearUserId = async () => {
    await cookies().delete("userId")
}
export const createUser = async (formData: FormData, role: string) => {
    try {
        await connectToDatabase()
        if (role == "customer") {
            const customer = await Customer.create(formData)
            if (!customer) {
                return JSON.stringify({ msg: "could not create customer"})
            }
            return JSON.stringify({ msg: "customer created"})
        } else if (role == "pharmacist") {
            const pharmacist = await Pharmacist.create(formData)
            if (!pharmacist) {
                return JSON.stringify({ msg: "could not create pharmacist"})
            }
            return JSON.stringify({ msg: "pharmacist created"})
        }
    } catch (error) {
       return JSON.stringify({ msg: "error encountered while creating user"})
    }
}

export const checkUserByEmail = async (email: string, role: string) => {
    try {
        await connectToDatabase()

        if (role === "") {
            // TODO: use the email and check both models where it exists
            // then return that result
        }

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
        return JSON.stringify({ msg: "error encountered while fetching user"})
    }
}

export const getUserInfo = async (role: string, userId: string) => {
    try {
        await connectToDatabase()
        if (role === "pharmacist") {
            const pharmacist = await Pharmacist.findById(userId)
            if (!pharmacist) {
                return JSON.stringify({ error: "pharmacist not found"})
            }
            return JSON.stringify({ msg: "OK", pharmacist: pharmacist })
        } else if (role == "customer") {
            const customer = await Customer.findById(userId)
            if (!customer) {
                return JSON.stringify({ msg: "customer not found"})
            }
            return JSON.stringify({ msg: "OK", customer: customer })
        }
    } catch (error) {
        return JSON.stringify({ msg: "error fetching user" })
    }
}


// user here is a normal customer
export const updateCustomer = async (data: UpdateCustomerParams, id: string) => {
    try {
        await connectToDatabase()
        const updatedCustomer = await Customer.findByIdAndUpdate(id, data, { new: true })
        if (!updatedCustomer) {
            return JSON.stringify({ msg: "could not update customer"})
        }
        return JSON.stringify({
            msg: "customer updated",
            updatedCustomer
        })
    } catch (error) {
        return JSON.stringify({
            msg: "error updating customer",
            error,
        })
    }
}

export const getCustomerBasedOnId = async (id: string) => {
    try {
        await connectToDatabase()
        const customer = await Customer.findById(id)
        if (!customer) {
            return JSON.stringify({
                msg: "could not find customer"
            })
        }
        return JSON.stringify({ msg: "customer found", customer })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching customer",
            error,
        })
    }
}