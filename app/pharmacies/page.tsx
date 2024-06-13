import Image from "next/image";
import Link from "next/link"
import { Input } from "@mantine/core";
import { list } from "@/lib/actions/pharmacy.actions";
import { getPatientId } from "@/lib/actions/user.actions";

export default async function Pharmacies() {


  const patientIdCookie = await getPatientId()
  const patientId = patientIdCookie?.value

  const pharmacies = await list(patientId!)
  const parsedPharmacies = JSON.parse(pharmacies)

  return (
    <section className="px-2 mt-4">
     <h1 className="text-xl text-center text-gray-500">Pharmacies Closer to you</h1>
     <div className="my-3">
      <Input
       placeholder="Start typing a pharmacy name"
       className="w-full rounded-lg"
      />
     </div>

     <section className="grid grid-cols-1 gap-2 md:grid-cols-2">
     {parsedPharmacies.map((pharmacy: PharmacyParams) => (
      <section key={pharmacy._id} className="rounded-xl p-2 border border-gray-500 shadow">
        <div className="">
         <Link href={`/pharmacies/${pharmacy._id}`}>
          <Image
           src={pharmacy.image}
           alt="ayeduase"
           width={300}
           height={300}
           className="object-cover rounded-xl w-full h-full"
          />
         </Link>
        </div>
       <h1 className="text-xl font-normal text-gray-500 my-1">{pharmacy.name}</h1>
       <p className="text-sm text-gray-500 mt-1 w-full">
        {pharmacy.description}
       </p>
       <section className="flex items-center gap-3 justify-between mt-2">
       <div>{pharmacy.drugs.length} items</div>
       <div className="flex items-center gap-1">
        <div className="h-[14px] w-[14px] rounded-full bg-green-500" />
        <div className="mt-[3px]">Opened</div>
       </div>
       </section>
      </section>     
     ))}
     </section>


    </section>
  )
}
