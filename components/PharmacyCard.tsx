import { LocateIcon } from "lucide-react"
import Link from "next/link"


type Props = {
  pharmacies: Pharmacies
}

export default function PharmacyCard({ pharmacies }: Props) {


  const calculatOpenedHours = () => {
    // return a boolean
  }


  return (
    <>
    {pharmacies.pharmacies?.map(pharmacy => (
     <Link href={`/pharmacies/${pharmacy._id}`} key={pharmacy._id} className="border border-[#ccc] rounded py-3 px-4 cursor-pointer hover:scale-105 transition-all
    duration-800 space-y-2">
     <h1>{pharmacy.name}</h1>
     <p className="line-clamp-2 text-xs text-gray-400">
      {pharmacy.description}
     </p>

     <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
       <div className="h-[5px] w-[5px] bg-green-900 rounded-full" />
       <p className="text-xs text-gray-500">Opened</p>
      </div>
      <div className="flex items-center gap-1">
       <LocateIcon className="w-3 h-3 text-gray-500" />
       <p className="text-xs text-gray-500">{pharmacy.location}</p>
      </div>
     </div>
     </Link>
    ))}
    </>
  )
}
