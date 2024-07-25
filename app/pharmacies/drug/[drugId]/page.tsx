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
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-20">
     <div className="w-full max-w-sm bg-white border border-gray-200 rounded shadow
      dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:scale-105 transition-all duration-800">
      <Image width={400} height={300} className="p-8 rounded-t-lg" src={drugDetail?.drug.image!} alt="product image" />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{drugDetail?.drug?.name}</h5>
        <div className="flex items-center mt-2.5 mb-5">
          <p className="text-gray-500 text-xs">{drugDetail?.drug.stock_quantity} in stock</p>
        </div>
        <div className="flex line-clamp-1 items-center mt-2.5 mb-5">
          {drugDetail?.drug.description}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">₵{drugDetail?.drug.price}</span>
        </div>
      </div>
     </div>

     <section className="border border-dark-500 rounded p-2">
      <h1 className="text-center font-bold">Billing Information</h1>
      <BillingForm drugId={drugDetail?.drug._id!} />
     </section>
    </section>
  )
}