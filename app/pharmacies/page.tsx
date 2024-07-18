import { getCustomerBasedOnId, getUserId } from "@/lib/actions/customer.actions"
import { Separator } from "@/components/ui/separator"
import { getOtherPharmacies, getPharmaciesBasedOnUserLocation } from "@/lib/actions/pharmacy.actions"
import PharmacyCard from "@/components/PharmacyCard"


export default async function Pharmacies() {
  const customerId = await getUserId()
  const customer = await getCustomerBasedOnId(customerId!)
  const parsedCustomer: any = JSON.parse(customer!)

  const pharmacies = await getPharmaciesBasedOnUserLocation(parsedCustomer.customer?.location)
  // const parsedPharmacies: Pharmacies = JSON.parse(pharmacies!)

  const others = await getOtherPharmacies(parsedCustomer.customer?.location)
  const parsedOthers: Pharmacies = JSON.parse(others!)

  return (
    <section className="flex">
     <section className="mt-2 w-[50%]">
     <section className="">
      <h1 className="text-2xl font-bold mb-4">Pharmacies closer to you</h1>
      <div className="grid grid-cols-3 gap-2">
       <PharmacyCard />
      </div>
        
     </section>
     <Separator />
     <section className="mb-5 mt-10">
      <h1 className="text-2xl mb-4 font-bold">Other pharmacies</h1>
      <div className="grid grid-cols-3 gap-2">
       <PharmacyCard />
      </div>
     </section>
     </section>

     <section className="mt-2 w-[50%] min-h-screen">
      Map here
     </section>
    </section>
  )
}
