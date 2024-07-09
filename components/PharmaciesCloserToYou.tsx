import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

type PharmaciesCloserProps = {
    pharmacy: {
        _id: string;
        name: string;
        description: string;
        location: string;
        address: string;
        email: string;
        drugs: [];
        working_hours: string;
        pharmacist: string;
        orders: [];
    }
}

export default function PharmaciesCloserToYou({ pharmacy }: PharmaciesCloserProps) {

  return (
    <section className="grid grid-cols-3">
     <Card className="rounded border border-gray-400 hover:scale-90 transition-all duration-150">
      <Link href={`/pharmacies/${pharmacy._id}`} className="cursor-pointer">
       <CardHeader className="p-2">
       <CardTitle>
        <Image
         src="/assets/pharmacy-demo.jpeg"
         alt="pharmacy demo"
         width={150}
         height={150}
         className="w-full h-full object-cover rounded hover:scale-90 transition-all duration-100"
        />
        <p className="text-2xl font-bold mt-1">
         {pharmacy.name}
        </p>
       </CardTitle>
       </CardHeader>
       <CardContent className="p-2">
        <p className="text-base text-gray-400">
         {pharmacy.description}
        </p>
       </CardContent>
       <CardFooter className="p-2">
        <div className="flex items-center gap-1">
         <p>Opening times:</p>
         <p className="text-sm text-gray-500">{pharmacy.working_hours}</p>
        </div>
       </CardFooter>
      </Link>
     </Card>
    </section>
  )
}
