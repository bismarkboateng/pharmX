import FileUploader from "@/components/FileUploader";
import { getPharmacy } from "@/lib/actions/pharmacy.actions";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    pharmacyId: string;
  }
}
export default async function PharmacyDetail({ params }: Props) {
  const pharmacyId = params.pharmacyId
  const pharmacyInfo = await getPharmacy(pharmacyId)
  const parsedPharmacy = JSON.parse(pharmacyInfo)

  const drugId = "smdksmdIskdf1938w"

  return (
    <section>
      <section className="grid grid-cols-2">
        <section className="mt-10 border-r border-gray-600 h-screen p-3">
          <h1 className="text-2xl font-bold mb-2">
            {parsedPharmacy.pharmacy?.name || "drugs"}
          </h1>
          <div className="">
            <Image
              src={parsedPharmacy.pharmacy?.image || "/assets/pharmacy-demo.jpeg"}
              alt="pharmacy info"
              width={500}
              height={300}
              className="w-full h-full rounded"
            />
          </div>
          <div className="mt-5 text-gray-500">{parsedPharmacy.pharmacy?.description}</div>
          <div className="flex items-center gap-1 mt-5">
            <p className="text-sm font-bold">Opening times:</p>
            <p className="text-sm text-gray-500">{parsedPharmacy.pharmacy?.working_hours}</p>
          </div>
        </section>

        <section className="p-3">
          <h1 className="text-center font-bold text-xl">Access drugs at {parsedPharmacy.pharmacy?.name}</h1>
          <FileUploader pharmacyId={params.pharmacyId}/>
        </section>
      </section>

    </section>
  )
}
