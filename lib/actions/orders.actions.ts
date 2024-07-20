"use server"

import { connectToDatabase } from "../database"
import Customer from "../database/models/customer.model"
import Order from "../database/models/orders.model"

type CreateOrderProps = {
    customer: string,
    pharmacy: string,
    drugs: string,
    status: string,
    values: {
        recipient_address: string,
        recipient_contact: string,
    }
}

export const getOrders = async (pharmacyId: string) => {
    try {
        await connectToDatabase()
        const orders = await Order.find({
            pharmacy: pharmacyId
        })
        if (!orders) {
            return JSON.stringify({ msg: "could not find orders"})
        }
        return JSON.stringify({ msg: "fetched orders", orders })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching orders",
            error,
        })   
    }
}

export const createOrder = async ({
    customer,
    pharmacy,
    drugs,
    status,
    values,
}: CreateOrderProps ) => {

    try {
        await connectToDatabase()
        const order = await Order.create({
            customer,
            pharmacy,
            drugs,
            status
        })

        const updatedCustomer = await Customer.findOneAndUpdate({ user: customer }, values, { new: true })

        if (!order) {
            return JSON.stringify({
                msg: "could not find order",
            })
        }
        return JSON.stringify({
            msg: "OK",
            order
        })
    } catch (error) {
        return JSON.stringify({
            msg: "error creating order",
            error
        })
    }    
}