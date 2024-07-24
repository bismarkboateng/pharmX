"use client"

import { useLoadScript } from "@react-google-maps/api"
import { Loader2 } from "lucide-react"
import RenderMap from "./RenderMap"


export default function Maps() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
        libraries: ["places"]
    })

    if (!isLoaded) return <Loader2 className="w-4 h-4 animate-spin" />
    return (
        <section>
         <RenderMap />
        </section>
    )
}