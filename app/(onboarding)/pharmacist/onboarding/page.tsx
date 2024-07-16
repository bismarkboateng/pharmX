import PharmacistForm from "@/components/forms/pharmacist/PharmacistForm";
import { getUserId, getUserInfo } from "@/lib/actions/customer.actions";
import { redirect } from "next/navigation";

export default async function PharmacistOnboarding() {
  const role = "pharmacist"

  const pharmacistId = await getUserId()
  const pharmacistInfo = await getUserInfo(role, pharmacistId!)
  const parsedPharmacistInfo = JSON.parse(pharmacistInfo!)

  if (parsedPharmacistInfo.pharmacist.onboardered) {
    return redirect(`/pharmacy/dashboard/${parsedPharmacistInfo.pharmacist._id}`)
  }

  return (
    <section>
     <section className="bg-white p-3 w-[40%] mx-auto mt-3 rounded
     shadow">
      <h1 className="text-2xl font-extrabold">Onboarding</h1>
      <p>Fill in your info</p>

      <section>
       <h3 className="text-base text-center underline mb-5">Pharmacist Info</h3>
       <PharmacistForm pharmacist={parsedPharmacistInfo.pharmacist} />
      </section>
     </section>
    </section>
  )
}
