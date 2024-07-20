"use client"

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { GiPill } from "react-icons/gi";
import { GrDocumentText } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import { clearUserId, getUserId } from "@/lib/actions/customer.actions";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";


export default function SidebarLinks({ userId }: { userId: string }) {
  const pathname = usePathname()
  const [error, setError] = useState("")
  const router = useRouter()
  const [currentUserId, setCurrentUserId] = useState("")


  useEffect(() => {
   const getCurrentUserId = async () => {
    const userId = await getUserId()
    setCurrentUserId(userId!)
   }

   getCurrentUserId()

  }, [currentUserId])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      await clearUserId()
      router.push("/accounts/sign-in")
    } catch (error) {
      toast.error("something went wrong, please try again")
    }
  }

  return (
    <section>
     <ul className="flex flex-col gap-4 mt-10">
      <Link href={`/pharmacy/dashboard/${currentUserId}`}
       className={`flex items-center gap-2 cursor-pointer
       ${pathname === `/pharmacy/dashboard/${currentUserId}` && "bg-blue-500 p-2 rounded text-white"}
      `}
      >
       <div><TbLayoutDashboardFilled fontSize={23} /></div>
       <p>Dashboard</p>
      </Link>

      <Link href={`/pharmacy/dashboard/${currentUserId}/drugs`}
       className={`flex items-center gap-2 
       ${pathname === `/pharmacy/dashboard/${currentUserId}/drugs` && "bg-blue-500 p-2 rounded text-white"}`}>
       <div><GiPill fontSize={20} /></div>
       <p>All drugs</p>
      </Link>

      <Link href={`/pharmacy/dashboard/${currentUserId}/orders`}
       className={`flex items-center gap-2
       ${pathname === `/pharmacy/dashboard/${currentUserId}/orders` && "bg-blue-500 p-2 rounded text-white"}
       `}>
       <div><GrDocumentText fontSize={20} /></div>
       <p>Orders</p>
      </Link>

      <Link href={`/pharmacy/dashboard/${currentUserId}/settings`}
      className={`flex items-center gap-2
      ${pathname === `/pharmacy/dashboard/${currentUserId}/settings` && "bg-blue-500 p-2 rounded text-white"}
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
