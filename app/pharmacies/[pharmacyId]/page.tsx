import FileUploader from "@/components/FileUploader";
import { getPharmacyBasedOnPharmacyId } from "@/lib/actions/pharmacy.actions";


type Props = {
  params: {
    pharmacyId: string;
  }
}

export default async function PharmacyDetail({ params }: Props) {
  const pharmacyId = params.pharmacyId
  const pharmacy = JSON.parse((await getPharmacyBasedOnPharmacyId(pharmacyId) as string))

  return (
    <section>
      <section className="grid grid-cols-2">
        <section className="mt-10 border-r border-gray-600 h-screen p-3">
          <h1 className="text-2xl font-bold mb-2">
            {pharmacy.pharmacy?.name}
          </h1>
          <article className="mt-5 text-gray-500 line-clamp-6">
           {pharmacy.pharmacy?.description}
          </article>
          <div className="flex items-center justify-between gap-1 mt-5">
            <div className="flex items-center gap-2">
             <p className="text-sm font-bold">Opening times:</p>
             <p className="text-sm text-gray-500">{pharmacy.pharmacy?.working_hours}</p>
            </div>
            <div className="text-sm font-bold">current drug list: <span className="text-sm text-gray-500">{20}</span></div>
          </div>
        </section>

        <section className="p-3">
          <h1 className="text-center font-bold text-xl">Access drugs at {pharmacy.pharmacy?.name}</h1>
          <FileUploader pharmacyId={params.pharmacyId}/>
        </section>
      </section>

    </section>
  )
}
