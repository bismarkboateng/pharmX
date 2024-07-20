import { getPharmacy, setPharmacyId } from "@/lib/actions/pharmacy.actions";
import SidebarLinks from "./SidebarLinks";
import { getUserId } from "@/lib/actions/customer.actions";

export default async function Sidebar() {
  const userId = await getUserId()

  const pharmacy = JSON.parse((await getPharmacy(userId!) as string)) as Pharmacy
  
  return (
    <section className="h-screen w-[15%] border-r border-light-4
     pl-2 pr-2 shadow">
     <div className="text-base font-bold mt-5">{pharmacy.pharmacy?.name}</div>
     <SidebarLinks userId={userId!} />
    </section>
  )
}
