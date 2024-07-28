import SignInForm from "@/components/forms/SignInForm";
import Image from "next/image";

export default function Signin() {

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen rounded p-5 md:p-0">
     <section className="w-full md:w-[50%] md:p-5 lg:p-10 xl:p-16 2xl:p-24">
      <div className="flex items-center gap-2 mb-5">
      <Image
       src="/assets/icons/logo.png"
       alt="pharm x logo"
       width={24}
       height={24}
      />
      <span className="text-xl font-bold">pharm X</span>
      </div>
      <h1 className="text-2xl font-bold mb-5">Sign in</h1>
      <SignInForm />
     </section>

     <div className="hidden md:block w-[50%]">
      <Image
       src="/assets/images/admin.png"
       alt="patient"
       height={1000}
       width={1000}
       className="object-cover md:block h-full w-full"
       priority
      />
     </div>
  </section>
  )
}
