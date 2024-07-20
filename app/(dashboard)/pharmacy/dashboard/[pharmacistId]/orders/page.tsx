import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getOrders } from "@/lib/actions/orders.actions"
import { getPharmacyId } from "@/lib/actions/pharmacy.actions"

export default async function OrdersPage() {
  // TODO: fetch all orders in this pharmacy
  const pharmacyId = await getPharmacyId()

  const orders = await getOrders(pharmacyId!)

  return (
    <section>
     <h1 className="text-xl font-bold mt-5">Orders</h1>
     <section className="mt-5">
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
        <TableRow>
         <TableCell>Bismark</TableCell>
         <TableCell>Paracetamol</TableCell>
         <TableCell>200</TableCell>
         <TableCell>pending</TableCell>
        </TableRow>
       </TableBody>
      </Table>
     </section>
    </section>
  )
}
