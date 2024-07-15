import CustomerOnboardingForm from "@/components/forms/CustomerOnboardingForm"
import {  getUserId, getUserInfo, getUserRole } from "@/lib/actions/customer.actions"


export default async function CustomerOnboarding() {
  const customerId = await getUserId()
  const role = "customer"
  const customer = await getUserInfo(role, customerId!)
  const parsedCustomer = JSON.parse(customer!)


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
