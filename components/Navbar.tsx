import Image from "next/image";
import Link from "next/link";
import User from "./User";


export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 w-full 
    z-50 flex items-center justify-between bg-dark-400">
     <Link href="/" className="flex items-center gap-2">
      <Image
       src="/assets/icons/logo-full.png"
       alt="logo"
       width={24}
       height={24}
       className="rounded-full"
      />
      <p className="text-white font-bold">Pharm X</p>
     </Link>
     <User />
    </nav>
  )
}
