import PharmacyForm from "@/components/forms/PharmacyForm";
import PharmacistForm from "@/components/forms/pharmacist/PharmacistForm";
import { getUserId, getUserInfo } from "@/lib/actions/customer.actions";


export default async function PharmacyOnboarding() {
  // const role = "pharmacist"

  // const pharmacistId = await getUserId()
  // const pharmacistInfo = await getUserInfo(role, pharmacistId!)
  // const parsedPharmacistInfo = JSON.parse(pharmacistInfo!)


  return (
    <section>
     <section className="w-[40%] mx-auto mt-8">
      <h1 className="text-2xl text-white font-extrabold">Onboarding</h1>
      <p>Fill in your pharmacy Info</p>

      <section>
       <h3 className="text-base mt-5 text-center underline mb-5">Pharmacy Info</h3>
       {/* <PharmacistForm pharmacist={parsedPharmacistInfo.pharmacist} /> */}
       <PharmacyForm />
      </section>
     </section>
    </section>
  )
}
