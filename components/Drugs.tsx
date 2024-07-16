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
      { drugsInfo.drugs.map(drug => (
        <section
         key={drug._id}
         className="bg-white rounded p-1 cursor-pointer shadow hover:scale-105 transition-all duration-500">
          <Link href={`drug/${drug._id}`}>
           <Image
            src={drug.image || ""}
            alt="drug info"
            width={300}
            height={150}
            className="rounded"
           />
          </Link>
         <p className="text-center">{drug.name}</p>
         <p className="text-center">₵{drug.price}</p>
        </section>
      ))}
     </section>
    </section>
  )
}
