import { getPharmacy, getPharmacyId } from "@/lib/actions/pharmacy.actions";
import SidebarLinks from "./SidebarLinks";

export default async function Sidebar() {
  const pharmacyId = await getPharmacyId()
  const pharmacy: any = await getPharmacy(pharmacyId!)
  const parsedPharmacy = JSON.parse(pharmacy!)


  return (
    <section className="h-screen w-[15%] border-r border-light-4 bg-white
     pl-2 pr-2 shadow">
     <div className="text-xl font-bold mt-5">{parsedPharmacy.pharmacy?.name}</div>
     <SidebarLinks pharmacyId={pharmacyId!} />
    </section>
  )
}
