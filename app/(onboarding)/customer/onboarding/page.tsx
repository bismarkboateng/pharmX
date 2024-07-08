import CustomerOnboardingForm from "@/components/forms/CustomerOnboardingForm"
import {  getUserRole } from "@/lib/actions/customer.actions"


export default async function CustomerOnboarding() {
  return (
    <section>
     <section className="w-[40%] mx-auto mt-8">
      <h1 className="text-2xl text-white font-extrabold">Onboarding</h1>
      <p>Complete your profile to access pharmX</p>

      <section>
       <CustomerOnboardingForm />
      </section>
     </section>
    </section>
  )
}
