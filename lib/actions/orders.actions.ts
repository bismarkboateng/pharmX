"use server"

import { connectToDatabase } from "../database"
import Customer from "../database/models/customer.model"
import Order from "../database/models/orders.model"
import { v4 as uuidv4 } from "uuid"
import User from "../database/models/user.model"
import { revalidatePath } from "next/cache"


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

export const getOrdersBasedOnPharmacyId = async (pharmacyId: string) => {
    try {
        await connectToDatabase();
        const orders = await Order.find({ pharmacy: pharmacyId })
            .populate({
                path: "drugs",
                select: "name price"
            })
            
        if (!orders) {
            return JSON.stringify({ msg: "could not find orders" });
        }

        const response = await Promise.all(orders.map(async (order) => {
            const customer = await User.findById(order.customer._id);
            return {
                name: customer.name,
                drugName: order.drugs.map((drug: any) => drug.name).join(', '), // join all drug names
                totalPrice: order.drugs.reduce((acc: any, drug: any) => acc + parseFloat(drug.price), 0).toFixed(2), // calculate total price
                status: order.status,
                id: order._id
            };
        }));


        return JSON.stringify({ msg: "fetched orders", response });

    } catch (error) {
        return JSON.stringify({
            msg: "error fetching orders",
            error,
        });
    }
};


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
            status,
            orderId: `Order-${uuidv4().split("-")[0]}`
        })

        const updatedCustomer = await Customer.findOneAndUpdate(
            { user: customer }, 
            {
                recipient_address: values.recipient_address,
                recipient_contact: values.recipient_contact,
            },
            { new: true })

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

export const getOrdersByUserId = async (userId: string) => {
    try {
        await connectToDatabase()
        const orders = await Order.find({ customer: userId })
        if (!orders) {
            return JSON.stringify({
                msg: "no orders found"
            })
        }
        return JSON.stringify({
            msg: "OK",
            orders,
        })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching user orders",
            error
        })
    }
}

export const updateOrderStatus = async (status: string, id: string, pathname: string) => {
    try {
        await connectToDatabase()
        await Order.findByIdAndUpdate(id, { status }, { new: true })
        revalidatePath(pathname)
    } catch (error) {
       throw error 
    }
}