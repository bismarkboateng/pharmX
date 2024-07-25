import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { connectToDatabase } from "@/lib/database";
import ID from "@/lib/database/models/id.model";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const match = searchParams.get("match")

    try {
        await connectToDatabase()
        const id = await ID.findOne({ id: match })
        if (!id) {
            return NextResponse.json("not found")
        }
        return NextResponse.json(true)
      
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }
}