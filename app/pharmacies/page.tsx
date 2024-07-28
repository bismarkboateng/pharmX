import { Separator } from "@/components/ui/separator"
import PharmacyCard from "@/components/PharmacyCard"
import { getUserId } from "@/lib/actions/customer.actions"
import { getOtherPharmacies, getPharmaciesBasedOnUserLocation } from "@/lib/actions/pharmacy.actions"
import Maps from "@/components/maps/Maps"



export default async function Pharmacies() {
  const userId = await getUserId()
  const closePharmacies = JSON.parse((await getPharmaciesBasedOnUserLocation(userId!) as string)) as Pharmacies
  const otherPharmacies = JSON.parse((await getOtherPharmacies(userId!) as string)) as Pharmacies


  return (
    <section className="mt-10 flex flex-col md:flex-row gap-4">
     <section className="w-full md:w-[50%]">
     <section className="p-3 md:p-0">
      <h1 className="text-2xl font-bold mb-4">Pharmacies closer to you</h1>
      <div className="grid grid-cols-2 md:grid-cols-1 md:pr-8 lg:pr-0 lg:grid-cols-2 xl:grid-cols-3 gap-2">
       <PharmacyCard pharmacies={closePharmacies} />
      </div>
        
     </section>
     <Separator />
     <section className="mb-5 mt-10 p-3 md:p-0">
      <h1 className="text-2xl mb-4 font-bold">Other pharmacies</h1>
      <div className="grid grid-cols-2 md:grid-cols-1 md:pr-8 lg:pr-0 lg:grid-cols-2 xl:grid-cols-3 gap-2">
       <PharmacyCard pharmacies={otherPharmacies} />
      </div>
     </section>
     </section>

     <section className="hidden md:block md:w-[50%] min-h-screen">
      <Maps />
     </section>
    </section>
  )
}
