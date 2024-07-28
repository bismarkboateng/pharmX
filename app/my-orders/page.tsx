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
    <section className="pl-5 md:pl-10 lg:pl-12 xl:pl-16">
      <h1 className="text-lg font-bold mt-5">Orders</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {drugs.drugs.map(drug => (
          <div key={drug._id} className="w-[200px] bg-white border
              border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer
              hover:scale-105 transition-all duration-800">
              <Image width={400} height={300}  className="p-8 rounded-t-lg" src={drug.image!} alt="product image" />
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{drug?.name}</h5>
              <div className="flex items-center mt-2.5 mb-5">
                {orders.orders.map(order => (
                 <div key={order._id} className="text-sm text-gray-500">Order id: {order?.orderId}</div>  
                ))}
              </div>
              <div className="flex items-center mt-2.5 mb-5">
                {orders.orders.map(order => (
                 <div key={order._id} className="flex flex-col">
                  <div className="text-sm"><span className="text-gray-1 text-sm">Order Status:</span> {order.status.toUpperCase()}</div>
                  <div className="text-sm">Ordered On: {moment(order.createdAt).format("DD-MM-YYYY")}</div>
                 </div>
                ))}
              </div>
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
