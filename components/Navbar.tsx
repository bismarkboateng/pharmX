import Image from "next/image";
import { Input } from "./ui/input";
import User from "./User";
import Link from "next/link";


export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
     <Link href="/" className="flex items-center gap-2">
      <Image
       src="/assets/favicon.ico"
       alt="logo"
       width={40}
       height={40}
       className="rounded-full"
      />
      <p className="text-gray-700 font-bold">pharmX</p>
     </Link>

     <div>
      <Input
       className="border border-[#ccc] rounded w-[150%]"
       placeholder="type a pharmacy name / location"
      />
     </div>
     <User />
    </nav>
  )
}
