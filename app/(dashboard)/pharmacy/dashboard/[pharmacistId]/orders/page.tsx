"use client"

import { Select, SelectItem, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getUserId } from "@/lib/actions/customer.actions"
import { getOrdersBasedOnPharmacyId, updateOrderStatus } from "@/lib/actions/orders.actions"
import { getPharmacy, getPharmacyId } from "@/lib/actions/pharmacy.actions"
import { SelectContent, SelectTrigger } from "@radix-ui/react-select"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

type Orders = {
  msg: string;
  response: {
    drugName: string;
    id: string;
    name: string;
    status: string;
    totalPrice: string;
  }[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Orders | null>(null)
  const pathname = usePathname()


  useEffect(() => {
    const fetchOrders = async () => {
      const userId = await getUserId()
      const pharmacy = JSON.parse((await getPharmacy(userId!) as string)) as Pharmacy

      const orders = JSON.parse((await getOrdersBasedOnPharmacyId(pharmacy.pharmacy._id!) as string)) as Orders
      setOrders(orders)
    }

    fetchOrders()
  }, [])

  const updateOrderStatusHandler = async (status: string, id: string) => {
    const updateStatus = async () => {
      await updateOrderStatus(status, id, pathname)
    }
    await updateStatus()    
  }

  return (
    <section className="p-9 lg:p-0">
      <h1 className="text-xl font-bold mt-20">Orders</h1>
      <section className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Drug</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.response.map((order) => (
              <TableRow key={order.id}>
               <TableCell>{order.name}</TableCell>
               <TableCell>{order.drugName}</TableCell>
               <TableCell>₵{order.totalPrice}</TableCell>
               <TableCell>
                <TableCell>
                <Select defaultValue={order.status} onValueChange={(value) => updateOrderStatusHandler(value, order.id)}>
                 <SelectTrigger>
                   <SelectValue placeholder={order.status} />
                 </SelectTrigger>
                 <SelectContent className="bg-white text-gray-600 p-0 m-0 rounded">
                   <SelectItem value="pending" className="hover:text-gray-800 cursor-pointer">
                     Pending
                   </SelectItem>
                   <SelectItem value="shipped" className="hover:text-gray-800 cursor-pointer">
                     Shipped
                   </SelectItem>
                   <SelectItem value="delivered" className="hover:text-gray-800 cursor-pointer">
                     Delivered
                   </SelectItem>
                 </SelectContent>
                </Select>
               </TableCell>
               </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </section>
  )
}

// Customer(name) Drug(name) Price Status(pending | processing | delivered )