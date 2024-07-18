import { LocateIcon } from "lucide-react"



export default function PharmacyCard() {

  return (
    <>
    {[0, 1, 2, 3, 4, 5].map(item => (
     <section key={item} className="border border-[#ccc] rounded py-3 px-4 cursor-pointer hover:scale-105 transition-all
    duration-800 space-y-2">
     <h1>Greenwood Pharmacy</h1>
     <p className="line-clamp-2 text-xs text-gray-400">
      Greenwood Pharmacy offers a wide range of prescription medications and over-the-counter products
     </p>

     <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
       <div className="h-[5px] w-[5px] bg-green-900 rounded-full" />
       <p className="text-xs text-gray-500">Opened</p>
      </div>
      <div className="flex items-center gap-1">
       <LocateIcon className="w-3 h-3 text-gray-500" />
       <p className="text-xs text-gray-500">Ayeduase</p>
      </div>
     </div>
     </section>
    ))}
    </>
  )
}
