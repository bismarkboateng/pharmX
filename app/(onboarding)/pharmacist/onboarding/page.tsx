import PharmacistForm from "@/components/forms/pharmacist/PharmacistForm";
import { getUserId, getUserInfo } from "@/lib/actions/customer.actions";


export default async function PharmacistOnboarding() {
  const role = "pharmacist"

  const pharmacistId = await getUserId()
  const pharmacistInfo = await getUserInfo(role, pharmacistId!)
  const parsedPharmacistInfo = JSON.parse(pharmacistInfo!)


  return (
    <section>
     <section className="w-[40%] mx-auto mt-8">
      <h1 className="text-2xl text-white font-extrabold">Onboarding</h1>
      <p>Fill in your info</p>

      <section>
       <h3 className="text-base mt-5 text-center underline mb-5">Pharmacist Info</h3>
       <PharmacistForm pharmacist={parsedPharmacistInfo.pharmacist} />
      </section>
     </section>
    </section>
  )
}
