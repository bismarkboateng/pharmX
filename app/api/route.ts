import { getUserId } from "@/lib/actions/customer.actions";
import User from "@/lib/database/models/user.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"

import { type NextRequest } from 'next/server'
import { connectToDatabase } from "@/lib/database";
import Customer from "@/lib/database/models/customer.model";
import Pharmacist from "@/lib/database/models/pharmacist.model";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    try {
        await connectToDatabase()

        let returnedUser: any

        const user = await User.findById(userId)
        if (user.role === "customer") {
            const customer = await Customer.findOne({ user: user._id })
            returnedUser = { role: "customer", id: customer._id }
        } else if (user.role == "pharmacist")  {
            const pharmacist = await Pharmacist.findOne({ user: user._id })
            returnedUser = { role: "pharmacist", id: pharmacist._id }
        }

        if (!returnedUser) {
            return NextResponse.json({ msg: "no user" })
        }
        return NextResponse.json(returnedUser)
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }
}