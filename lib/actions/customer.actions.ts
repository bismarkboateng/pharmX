"use server"

import { connectToDatabase } from "../database"
import Customer from "../database/models/customer.model"
import Pharmacist from "../database/models/pharmacist.model"
import { cookies } from "next/headers"
import User from "../database/models/user.model"


type FormData = {
    name: string,
    email: string,
    password: string,
    address: string;
    contact: string,
    role: string;
    age: string;
    location: string;
    id_number: string;
}

type UpdateCustomerParams = {
    address: string;
    age: string;
    contact: string;
    location: string;
    ID: string;
    image: string;
    onboarded: boolean;
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
export const createUser = async (formData: FormData) => {
    try {
        await connectToDatabase()
        const user = await User.create({
            name: formData.name,
            email: formData.email,
            address: formData.address,
            contact: formData.contact,
            role: formData.role,
        })

        if (user.role === "customer") {
            const customer = await Customer.create({
                user: user._id,
                age: formData.age,
                location: formData.location,
                id_number: formData.id_number,
            })

            if (!customer) {
                return JSON.stringify({ msg: "could not create customer"})
            }
            return JSON.stringify({ msg: "customer created", customer })
        }
    } catch (error) {
       return JSON.stringify({ msg: "error encountered while creating user"})
    }
}

export const checkUserByEmail = async (email: string) => {
    try {
        await connectToDatabase()

        const user = await User.findOne({ email: email })
        if (!user) {
            return JSON.stringify({ isExist: false })
        }
        return JSON.stringify({ isExist: true , user: user })

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