"use client"

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { GiPill } from "react-icons/gi";
import { GrDocumentText } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import { IoMdLogOut } from "react-icons/io";
import { useState } from "react";
import { clearPharmacyId } from "@/lib/actions/pharmacy.actions";
import { clearUserId, clearUserRole } from "@/lib/actions/customer.actions";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";


export default function SidebarLinks({ pharmacyId }: { pharmacyId: string }) {
  const pathname = usePathname()
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      await clearPharmacyId()
      await clearUserRole()
      await clearUserId()
      router.push("/accounts/sign-in")
    } catch (error) {
      setError("something went wrong, please try again")
    }
  }

  return (
    <section>
     <ul className="flex flex-col gap-4 mt-10">
      <Link href={`/pharmacy/dashboard/${pharmacyId}`}
       className={`flex items-center gap-2 cursor-pointer
       ${pathname === `/pharmacy/dashboard/${pharmacyId}` && "bg-blue-500 p-2 rounded"}
      `}
      >
       <div><TbLayoutDashboardFilled fontSize={23} /></div>
       <p>Dashboard</p>
      </Link>

      <Link href={`/pharmacy/dashboard/${pharmacyId}/drugs`}
       className={`flex items-center gap-2 
       ${pathname === `/pharmacy/dashboard/${pharmacyId}/drugs` && "bg-blue-500 p-2 rounded"}`}>
       <div><GiPill fontSize={20} /></div>
       <p>All drugs</p>
      </Link>

      <Link href={`/pharmacy/dashboard/${pharmacyId}/orders`}
       className={`flex items-center gap-2
       ${pathname === `/pharmacy/dashboard/${pharmacyId}/orders` && "bg-blue-500 p-2 rounded"}
       `}>
       <div><GrDocumentText fontSize={20} /></div>
       <p>Orders</p>
      </Link>

      <Link href={`/pharmacy/dashboard/${pharmacyId}/settings`}
      className={`flex items-center gap-2
      ${pathname === `/pharmacy/dashboard/${pharmacyId}/settings` && "bg-blue-500 p-2 rounded"}
      `}>
       <div><IoSettingsOutline fontSize={20} /></div>
       <p>Settings</p>
      </Link>

      <div
       className="flex items-center gap-2 mt-8 cursor-pointer"
       onClick={handleLogout}
      >
       <div><IoMdLogOut className="text-blue-600" fontSize={20} /></div>
       <p>Logout</p>
      </div>

     </ul>
    </section>
  )
}
