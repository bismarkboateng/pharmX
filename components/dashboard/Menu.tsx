"use client"

import { IoMdMenu } from "react-icons/io";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import SidebarLinks from "./SidebarLinks";
import { useEffect, useState } from "react";
import { getUserId } from "@/lib/actions/customer.actions";
import { getPharmacy } from "@/lib/actions/pharmacy.actions";

export default function Menu() {
    const [userId, setUserId] = useState("")
    const [pharmacyInfo, setPharmacyInfo] = useState({} as Pharmacy)

    useEffect(() => {
        const getDetails = async () => {
            const userId = await getUserId()
            const pharmacy = JSON.parse((await getPharmacy(userId!) as string)) as Pharmacy
            setUserId(userId!)
            setPharmacyInfo(pharmacy)
        }
        getDetails()
    }, [])

    return (
        <div className="text-black">
         <Sheet>
          <SheetTrigger>
           <IoMdMenu className="text-white" fontSize={24} />
          </SheetTrigger>
          <SheetContent className="bg-white text-gray-600">
           <SheetHeader>
            <SheetDescription>
              <div className="text-base font-bold mt-5">{pharmacyInfo?.pharmacy?.name}</div>
              <SidebarLinks userId={userId!} />
            </SheetDescription>
           </SheetHeader>
          </SheetContent>
         </Sheet>
        </div>
    )
}