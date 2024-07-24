import { Separator } from "@/components/ui/separator"
import PharmacyCard from "@/components/PharmacyCard"
import { getUserId } from "@/lib/actions/customer.actions"
import { getPharmaciesBasedOnUserLocation } from "@/lib/actions/pharmacy.actions"
import Maps from "@/components/maps/Maps"


export default async function Pharmacies() {
  const userId = await getUserId()

  const closePharmacies = JSON.parse((await getPharmaciesBasedOnUserLocation(userId!) as string)) as Pharmacies


  return (
    <section className="mt-10 flex">
     <section className="w-[50%]">
     <section className="">
      <h1 className="text-2xl font-bold mb-4">Pharmacies closer to you</h1>
      <div className="grid grid-cols-3 gap-2">
       <PharmacyCard pharmacies={closePharmacies} />
      </div>
        
     </section>
     <Separator />
     <section className="mb-5 mt-10">
      <h1 className="text-2xl mb-4 font-bold">Other pharmacies</h1>
      <div className="grid grid-cols-3 gap-2">
       <PharmacyCard pharmacies={closePharmacies} />
      </div>
     </section>
     </section>

     <section className="w-[50%] min-h-screen">
      <Maps />
     </section>
    </section>
  )
}
