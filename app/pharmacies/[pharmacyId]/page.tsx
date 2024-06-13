import Image from "next/image"
import { Spoiler, Divider } from '@mantine/core';
import Link from "next/link";
import { read } from "@/lib/actions/pharmacy.actions";

export default async function PharmacyDetail({ params }: { params: { pharmacyId: string}}) {
  const pharmacy = await read(params.pharmacyId)
  const parsedPharmacy = JSON.parse(pharmacy)

  return (
    <section>
      <h1 className="capitalize text-center text-lg mt-3 font-medium">
       Welcome to the {parsedPharmacy.name} pharmacy.
      </h1>
      <section className="mt-2 px-2">
       <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK40UOYGT_YvG4IwITTncR6sdU_q35x7S1zA&s"
        alt="kingdom shop"
        width={300}
        height={300}
        className="w-full h-full rounded"
       />
       <Spoiler className="mt-2 text-gray-500" maxHeight={120} showLabel="Show more" hideLabel="Hide" transitionDuration={0}>
        {parsedPharmacy.description}
       </Spoiler>
       <Divider my="md" />
       <section>
        <h4 className=" text-gray-500 font-medium">Opened hours</h4>
        <div className="text-xs italice text-gray-400">
         {parsedPharmacy.working_hours}
        </div>
       </section>
       <Divider my="md" />

       <section>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_ZmpBHPft3ZtKOyg2v369qbyQ8LXIoVhrg&s"
          alt="pharmacist at kingdom shop"
          width={300}
          height={300}
          className="w-full h-full rounded"
        />
        <h1 className="text-gray-700 mt-2 text-xl font-medium">{parsedPharmacy.pharmacist.name}</h1>
        <Spoiler className="mt-2 text-gray-500" maxHeight={120} showLabel="Show more" hideLabel="Hide" transitionDuration={0}>
          {parsedPharmacy.pharmacist.bio}
        </Spoiler>
        <div className="italic text-gray-500 my-2">License number: {parsedPharmacy.pharmacist.license_number}</div>
       </section>
       <Divider my="md" />

       <section className="mb-4">
        <Link className="text-[#3498db] text-lg underline"
        href={`/pharmacies/${params.pharmacyId}/drugs`}>
          Get a drug
        </Link>
       </section>
      </section>
    </section>
  )
}