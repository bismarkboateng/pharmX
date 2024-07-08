"use server"

import { connectToDatabase } from "../database"
import Order from "../database/models/orders.model"


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