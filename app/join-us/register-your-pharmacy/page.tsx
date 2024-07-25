import Image from "next/image";
import { getUserId, getUserInfo } from "@/lib/actions/customer.actions";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

export default async function Registeryourpharmacy() {
    const role = "pharmacist"

  const pharmacistId = await getUserId()
  const pharmacistInfo = await getUserInfo(role, pharmacistId!)
  const parsedPharmacistInfo = JSON.parse(pharmacistInfo!)
  
  return (
    <section className="p-3 md:p-10">
     <Link href="/" className="flex items-center gap-2 mb-5">
      <Image
        src="/assets/icons/logo-full.png"
        alt="pharm x logo"
        width={24}
        height={24}
      />
      <span className="text-xl font-bold">Pharm X</span>
     </Link>
     <RegisterForm />
    </section>
  )
}
