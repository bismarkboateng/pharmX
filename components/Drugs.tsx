import Image from "next/image"
import Link from "next/link"

type Props = {
  drugsInfo: DrugsFromDBType
}

export default function Drugs({ drugsInfo }: Props) {
  return (
    <section className="ml-7 mt-5">
      <h1>Drugs found!</h1>
      <section className="mt-3 grid grid-cols-2 gap-2">
        {drugsInfo.drugs?.map(drug => (
          <div key={drug._id} className="w-full max-w-sm bg-white border border-gray-200 rounded shadow
        dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:scale-105 transition-all duration-800">
            <Link href={`/pharmacies/drug/${drug._id}`}>
              <Image width={400} height={300} className="p-8 rounded-t-lg" src={drug.image!} alt="product image" />
            </Link>
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{drug?.name}</h5>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">₵{drug.price}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}
