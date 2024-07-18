import CustomerSignUpForm from "@/components/forms/CustomerSignUpForm"
import Image from "next/image"



export default function Signup() {

  return (
    <section className="flex w-full min-h-screen rounded shadow">
      <section className="w-[50%] p-24">
       <div className="flex items-center gap-2 mb-5">
        <Image
         src="/assets/icons/logo-full.png"
         alt="pharm x logo"
         width={24}
         height={24}
        />
        <span className="text-xl font-bold">Pharm X</span>
       </div>
       <h1 className="text-2xl font-bold mb-5">Create an account with us.</h1>
       <CustomerSignUpForm />
      </section>

      <div className="w-[50%]">
       <Image
        src="/assets/images/onboarding-img.png"
        alt="patient"
        height={1000}
        width={1000}
        className="hidden object-cover md:block h-full w-full"
       />
      </div>

    </section>
  )
}
