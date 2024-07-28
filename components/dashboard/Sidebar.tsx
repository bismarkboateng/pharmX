import { getPharmacy, setPharmacyId } from "@/lib/actions/pharmacy.actions";
import SidebarLinks from "./SidebarLinks";
import { getUserId } from "@/lib/actions/customer.actions";
import Menu from "./Menu";



export default async function Sidebar() {
  const userId = await getUserId()

  const pharmacy = JSON.parse((await getPharmacy(userId!) as string)) as Pharmacy
  
  return (
    <>
     <div className="fixed top-5 left-10 z-50 lg:hidden">
      <Menu />
     </div>
     <section className="hidden lg:block h-screen w-[15%] pl-2 pr-2 shadow">
      <div className="text-base font-bold mt-5">{pharmacy.pharmacy?.name}</div>
      <SidebarLinks userId={userId!} />
    </section>
    </>
  )
}
