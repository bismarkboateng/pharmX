import Image from "next/image";
import Link from "next/link";
import User from "./User";


export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 w-full 
    z-50 flex items-center justify-between bg-dark-400 bg-[#1A237E] py-2 px-8 md:px-9
     lg:px-12 xl:px-16">
     <Link href="/" className="flex items-center gap-2">
      <Image
       src="/assets/icons/logo.png"
       alt="logo"
       width={24}
       height={24}
       className="rounded-full"
      />
      <p className="text-white font-bold">pharm X</p>
     </Link>
     <User />
    </nav>
  )
}
