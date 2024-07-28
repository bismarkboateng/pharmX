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
     <Link href={`/pharmacies/${pharmacy._id}`} key={pharmacy._id}
     className="border border-[#E0E0E0] bg-[#F8F8F8] rounded py-3 px-4 cursor-pointer hover:scale-105 transition-all
    duration-800 space-y-2">
     <h1 className="text-[#333333]">{pharmacy.name}</h1>
     <p className="line-clamp-2 text-xs text-[#666666]">
      {pharmacy.description}
     </p>

     <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
       <div className="h-[5px] w-[5px] bg-[#4CAF50] rounded-full" />
       <p className="text-xs text-gray-500">Opened</p>
      </div>
      <div className="flex items-center gap-1">
       <LocateIcon className="w-3 h-3 text-gray-500" />
       <p className="text-xs text-[#666666]">{pharmacy.location}</p>
      </div>
     </div>
     </Link>
    ))}
    </>
  )
}
