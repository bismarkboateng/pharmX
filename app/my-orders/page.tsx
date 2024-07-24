import { getUserId } from "@/lib/actions/customer.actions"
import { getDrugsBasedOnMultipleIds } from "@/lib/actions/drug.actions"
import { getOrdersByUserId } from "@/lib/actions/orders.actions"
import Image from "next/image"
import moment from "moment"
import { Fragment } from "react"

export default async function page() {

  const userId = await getUserId()
  const orders = JSON.parse((await getOrdersByUserId(userId!) as string)) as OrdersFromDB

  let drugIds: string[] = []

  orders.orders.map(item => {
     item.drugs.map(id => drugIds.push(id))
  })

  const drugs = JSON.parse((await getDrugsBasedOnMultipleIds(drugIds) as string)) as DrugsFromDBType

  return (
    <section>
      <h1 className="text-lg font-bold mt-5">Orders</h1>
      <section className="grid grid-cols-3 mt-5">
       {drugs.drugs.map(drug => (
        <section key={drug._id}
        className="flex flex-start gap-2 p-2 border border-dark-500 rounded hover:scale-105
         transition-all duration-800 cursor-pointer">
       <div>
        <Image
         src={drug.image!}
         alt="drug"
         width={100}
         height={100}
         className="object-cover"
         priority 
        />
       </div>
       <div className="space-y-6">
        <div>
         <div className="mt-2 font-medium">{drug.name}</div>
         {orders.orders.map(order => (
          <div key={order._id} className="text-sm text-gray-500">{order?.orderId}</div>  
          ))}
        </div>
        <div>
          {orders.orders.map(order => (
            <Fragment key={order._id}>
             <div className="text-green-500 text-sm">{order.status.toUpperCase()}</div>
             <div className="">On {moment(order.createdAt).format("DD-MM-YYYY")}</div>
            </Fragment>
          ))}
        </div>
       </div>
        </section>
       ))}
      </section>
    </section>
  )
}
