import AddProduct from "@/components/dashboard/AddProduct"
import {
  Table, TableBody, TableCaption,
  TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

export default function AllDrugs() {
  return (
    <section className="p-5">
     <AddProduct />
     <section className="mt-10">
     <Table>
      <TableCaption>A list of drugs.</TableCaption>
      <TableHeader>
       <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Prescription</TableHead>
        <TableHead>Stock</TableHead>
        <TableHead>Expiry</TableHead>
       </TableRow>
      </TableHeader>
      <TableBody>
       <TableRow>
        <TableCell>INV001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell>$250.00</TableCell>
        <TableCell>$250.00</TableCell>
        <TableCell>$250.00</TableCell>
       </TableRow>
      </TableBody>
     </Table>
     </section>
    </section>
  )
}
