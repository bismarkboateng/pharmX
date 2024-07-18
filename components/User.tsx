"use client"

import { FaUser } from "react-icons/fa6";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { IoMdLogOut } from "react-icons/io";
import { clearUserId, clearUserRole } from "@/lib/actions/customer.actions";
import { clearPharmacyId } from "@/lib/actions/pharmacy.actions";
import { useRouter } from "next/navigation";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { IoMdSettings } from "react-icons/io";
import UserSettings from "./UserSettings";






export default function User() {



  return (
    <section className="fixed right-10 bottom-10">
      {/* <DropdownMenu>
      <DropdownMenuTrigger>
       <div>
        <FaUser fontSize={22} className="cursor-pointer" />
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
        
       </DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu> */}
     <AlertDialog>
       <AlertDialogTrigger>
        <div className="">
         <IoMdSettings fontSize={30} className="text-blue-500" />
        </div>
       </AlertDialogTrigger>
       <AlertDialogContent className="bg-dark-300 border-0 rounded text-white">
        <AlertDialogHeader>
         <AlertDialogTitle>Settings</AlertDialogTitle>
          <AlertDialogDescription>
           <UserSettings />
         </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-blue-600 hover:bg-blue-600
           active:bg-blue-600 border-0 rounded">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
       </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
