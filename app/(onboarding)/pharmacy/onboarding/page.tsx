import PharmacyForm from "@/components/forms/PharmacyForm";

export default async function PharmacyOnboarding() {

  return (
    <section>
     <section className="w-[40%] mx-auto mt-8">
      <h1 className="text-2xl text-white font-extrabold">Onboarding</h1>
      <p>Fill in your pharmacy Info</p>

      <section>
       <h3 className="text-base mt-5 text-center underline mb-5">Pharmacy Info</h3>
       <PharmacyForm />
      </section>
     </section>
    </section>
  )
}
