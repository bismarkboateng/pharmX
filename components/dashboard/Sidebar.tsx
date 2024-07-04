import { TbLayoutDashboardFilled } from "react-icons/tb";
import { GiPill } from "react-icons/gi";
import { GrDocumentText } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from "next/navigation"
import Link from "next/link";
import { getUserId } from "@/lib/actions/customer.actions";

export default async function Sidebar() {


  return (
    <section className="h-screen w-[15%] border-r border-light-4 pl-2 pr-2">
     <div className="text-xl font-bold mt-5">Kingdom Pharma</div>
     <ul className="flex flex-col gap-4 mt-10">
      
      <Link href="#"
       className={`flex items-center gap-2 cursor-pointer`}
      >
       <div><TbLayoutDashboardFilled fontSize={23} /></div>
       <p>Dashboard</p>
      </Link>

      <Link href="#" 
       className={`flex items-center gap-2 `}>
       <div><GiPill fontSize={20} /></div>
       <p>All drugs</p>
      </Link>

      <Link href="#" className="flex items-center gap-2">
       <div><GrDocumentText fontSize={20} /></div>
       <p>Orders</p>
      </Link>

      <Link href="#" className="flex items-center gap-2">
       <div><IoSettingsOutline fontSize={20} /></div>
       <p>Settings</p>
      </Link>

     </ul>
    </section>
  )
}
