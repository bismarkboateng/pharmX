"use client"

import Link from "next/link"
import { IoMdLogOut } from "react-icons/io"
import { clearUserId, clearUserRole } from "@/lib/actions/customer.actions";
import { clearPharmacyId } from "@/lib/actions/pharmacy.actions";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label"


export default function UserSettings() {
  const router = useRouter()


  const handleLogout = async () => {
    await clearUserRole()
    await clearUserId()
    await clearPharmacyId()
    router.push("/accounts/sign-in")
  }

  return (
    <section className="flex flex-col space-y-6">
      <Link href="#" className="mt-2">
       Orders
      </Link>

      <div className="flex flex-col">
       <Label className="mb-2">Change password</Label>
       <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
         type="email"
         placeholder="***"
         className="border border-dark-500 bg-dark-400 rounded"
        />
        <Button type="submit" className="bg-blue-600 hover:bg-blue-600
        active:bg-blue-600 rounded">Change</Button>
       </div>
      </div>

      <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
        <div><IoMdLogOut className="text-blue-600" fontSize={20} /></div>
        <p className="hover:text-zinc-500 transition-colors">Logout</p>
      </div>

    </section>
  )
}
