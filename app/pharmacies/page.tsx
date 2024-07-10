import { getCustomerBasedOnId, getUserId } from "@/lib/actions/customer.actions"
import { Separator } from "@/components/ui/separator"
import { getPharmaciesBasedOnUserLocation } from "@/lib/actions/pharmacy.actions"
import PharmaciesCloserToYou from "@/components/PharmaciesCloserToYou"


export default async function Pharmacies() {
  const customerId = await getUserId()
  const customer = await getCustomerBasedOnId(customerId!)
  const parsedCustomer: any = JSON.parse(customer!)

  const pharmacies = await getPharmaciesBasedOnUserLocation(parsedCustomer.customer?.location)
  const parsedPharmacies: Pharmacies = JSON.parse(pharmacies!)

  return (
    <section>
     <section className="mt-10">
      <h1 className="text-2xl font-bold mb-4">Pharmacies closer to you</h1>
      <div className="grid grid-cols-3 gap-2">
       {parsedPharmacies.pharmacies.map((pharmacy) => (
         <PharmaciesCloserToYou
          key={pharmacy._id}
          pharmacy={pharmacy}
         />
       ))}
      </div>
        
     </section>
     <Separator />
     <section className="text-2xl font-bold mb-4 mt-10">
      <h1>Other pharmacies</h1>
     </section>
    </section>
  )
}
