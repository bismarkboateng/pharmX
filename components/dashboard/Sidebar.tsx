import { getPharmacyId } from "@/lib/actions/pharmacy.actions";
import SidebarLinks from "./SidebarLinks";

export default async function Sidebar() {
  const pharmacyId = await getPharmacyId()

  return (
    <section className="h-screen w-[15%] border-r border-light-4 pl-2 pr-2">
     <div className="text-xl font-bold mt-5">Kingdom Pharma</div>
     <SidebarLinks pharmacyId={pharmacyId!} />
    </section>
  )
}
