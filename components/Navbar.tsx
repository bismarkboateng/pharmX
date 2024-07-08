import Image from "next/image";
import { Input } from "./ui/input";
import { FaUser } from "react-icons/fa6";
import User from "./User";


export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">

     <div className="flex items-center gap-2">
      <Image
       src="/assets/favicon.ico"
       alt="logo"
       width={40}
       height={40}
       className="rounded-full"
      />
      <p className="text-white font-bold">pharmX</p>
     </div>

     <div>
      <Input
       className="account-form_input rounded w-[150%]"
       placeholder="type a pharmacy name / location"
      />
     </div>
     <User />
    </nav>
  )
}
