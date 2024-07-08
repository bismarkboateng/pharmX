"use client"

import { FaUser } from "react-icons/fa6";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "./ui/separator";
import Link from "next/link";
import { IoMdLogOut } from "react-icons/io";

export default function User() {
  const handleLogout = () => {}

  return (
    <section>
     <DropdownMenu>
      <DropdownMenuTrigger>
       <div>
        <FaUser fontSize={25} className="cursor-pointer" />
       </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-black rounded">
       <DropdownMenuLabel>My Account</DropdownMenuLabel>
       <DropdownMenuSeparator />
       <DropdownMenuItem>
        <Link href="#" className="cursor-pointer hover:text-zinc-500 transition-colors">
         Profile
        </Link>
       </DropdownMenuItem>
       <Separator className="bg-gray-300" />
       <DropdownMenuItem>
        <Link href="#" className="cursor-pointer hover:text-zinc-500 transition-colors">
         Change Password
        </Link>
       </DropdownMenuItem>
       <Separator className="bg-gray-300" />
       <DropdownMenuItem>
        <Link href="#" className="cursor-pointer hover:text-zinc-500 transition-colors">
         My Orders
        </Link>
       </DropdownMenuItem>
       <Separator className="bg-gray-300" />
       <DropdownMenuItem className="cursor-pointer">
        <div
         className="flex items-center gap-2 cursor-pointer"
         onClick={handleLogout}
        >
         <div><IoMdLogOut className="text-blue-600" fontSize={20} /></div>
         <p className="hover:text-zinc-500 transition-colors">Logout</p>
        </div>
       </DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu>
    </section>
  )
}
