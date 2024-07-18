import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
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
    </nav>
  )
}
