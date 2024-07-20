"use client"

import Link from "next/link";
import { IoMdLogOut } from "react-icons/io";
import { clearUserId } from "@/lib/actions/customer.actions";
import { clearPharmacyId } from "@/lib/actions/pharmacy.actions";
import { usePathname, useRouter } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function User() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await clearUserId()
    await clearPharmacyId()
    router.push("/accounts/sign-in")
  }


  return (
    <section className="fixed right-10 bottom-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="">
            {pathname === "/pharmacies"
             ? (
              <IoMdSettings fontSize={30} className="text-blue-500" />
             )
             : ""}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-dark-400 border border-dark-500">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <div className="h-[1px] w-full bg-gray-600" />
          <DropdownMenuItem>
            <Link href="/my-orders" className="mt-2 hover:text-gray-400">
              Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
              <div><IoMdLogOut className="text-blue-600" fontSize={20} /></div>
              <p className="hover:text-zinc-500 transition-colors">Logout</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  )
}
