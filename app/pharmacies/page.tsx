import { getCustomerBasedOnId, getUserId } from "@/lib/actions/customer.actions"
import { Separator } from "@/components/ui/separator"
import { getOtherPharmacies, getPharmaciesBasedOnUserLocation } from "@/lib/actions/pharmacy.actions"
import PharmaciesCloserToYou from "@/components/PharmaciesCloserToYou"


export default async function Pharmacies() {
  const customerId = await getUserId()
  const customer = await getCustomerBasedOnId(customerId!)
  const parsedCustomer: any = JSON.parse(customer!)

  const pharmacies = await getPharmaciesBasedOnUserLocation(parsedCustomer.customer?.location)
  const parsedPharmacies: Pharmacies = JSON.parse(pharmacies!)

  const others = await getOtherPharmacies(parsedCustomer.customer?.location)
  const parsedOthers: Pharmacies = JSON.parse(others!)

  return (
    <section>
     <section className="mt-10">
      <h1 className="text-2xl font-bold mb-4">Pharmacies closer to you</h1>
      <div className="grid grid-cols-3 gap-2">
       {parsedPharmacies.pharmacies.length === 0 &&
        <p className="text-gray-500">
         we could not find any pharmacy closer to you
        </p>}
       {parsedPharmacies.pharmacies.map((pharmacy) => (
         <PharmaciesCloserToYou
          key={pharmacy._id}
          pharmacy={pharmacy}
         />
       ))}
      </div>
        
     </section>
     <Separator />
     <section className="text-2xl font-bold mb-5 mt-10">
      <h1 className="mb-4">Other pharmacies</h1>
      <div className="grid grid-cols-3 gap-2">
      {parsedOthers.pharmacies.length === 0 && 
      <p className="text-gray-500">
       could not find pharmacies around you
      </p>}
      {parsedOthers.pharmacies.map(pharmacy => (
        <PharmaciesCloserToYou
         key={pharmacy._id}
         pharmacy={pharmacy}
        />
      ))}
      </div>
     </section>
    </section>
  )
}
