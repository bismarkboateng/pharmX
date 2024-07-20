"use client"

import BillingForm from "@/components/forms/BillingForm";
import { Button } from "@/components/ui/button";
import { getDrugBasedOnID } from "@/lib/actions/drug.actions";
import Image from "next/image";
import { useState, useEffect } from "react"

type Props = {
    params: {
        drugId: string;
    }
}

export default function DrugDetail({ params }: Props) {
  const [drugDetail, setDrugDetail] = useState<DrugDetailFromDBType | null>(null)
  
  useEffect(() => {
    const getDrugInfo = async () => {
        const drug = (JSON.parse(await getDrugBasedOnID(params.drugId!) as string)) as DrugDetailFromDBType
        setDrugDetail(drug)
    }

    getDrugInfo()
  }, [params.drugId])

  return (
    <section className="grid grid-cols-2 gap-10 items-start mt-20">
     <section className="flex flex-col border border-dark-500 p-3 rounded
     ">
      <div className="flex flex-row gap-2">
       <div>
        <Image
         src={drugDetail?.drug?.image || ""}
         alt={drugDetail?.drug?.name || ""}
         width={150}
         height={150}
         className="rounded"
         priority
        />
       </div>
       <div>
       <p>
        {drugDetail?.drug?.name}
       </p>
       <p className="text-gray-500 text-xs">{drugDetail?.drug.stock_quantity} in stock</p>

       <div className="mt-10">
        ₵{drugDetail?.drug.price}
       </div>
       </div>
      </div>
      <div className="mt-3 text-gray-400">
       {drugDetail?.drug.description}
      </div>
     </section>

     <section className="border border-dark-500 rounded p-2">
      <h1 className="text-center font-bold">Billing Information</h1>
      <BillingForm drugId={drugDetail?.drug._id!} />
     </section>

    </section>
  )
}