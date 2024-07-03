import PharmacistForm from "@/components/forms/pharmacist/PharmacistForm";


export default function PharmacistOnboarding() {
  return (
    <section>
     <section className="w-[40%] mx-auto mt-8">
      <h1 className="text-2xl text-white font-extrabold">Onboarding</h1>
      <p>Fill in your info</p>

      <section>
       <h3 className="text-base mt-5 text-center underline mb-5">Pharmacist</h3>
       <PharmacistForm />
      </section>
     </section>
    </section>
  )
}
