import Image from "next/image";
import PharmacistForm from "@/components/forms/pharmacist/PharmacistForm";
import { getUserId, getUserInfo } from "@/lib/actions/customer.actions";
import { redirect } from "next/navigation";
import PharmacyForm from "@/components/forms/PharmacyForm";
import RegisterForm from "@/components/forms/RegisterForm";

export default async function Registeryourpharmacy() {
    const role = "pharmacist"

  const pharmacistId = await getUserId()
  const pharmacistInfo = await getUserInfo(role, pharmacistId!)
  const parsedPharmacistInfo = JSON.parse(pharmacistInfo!)
  
  return (
    <section className="p-5">
     <div className="flex items-center gap-2 mb-5 ml-3">
      <Image
        src="/assets/icons/logo-full.png"
        alt="pharm x logo"
        width={24}
        height={24}
      />
      <span className="text-xl font-bold">Pharm X</span>
     </div>
     <RegisterForm />
    </section>
  )
}
