import AddProduct from "@/components/dashboard/AddProduct"
import {
  Table, TableBody, TableCaption,
  TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getDrugsBasedOnPharmacyId } from "@/lib/actions/drug.actions";
import { getUserId } from "@/lib/actions/customer.actions";
import { getPharmacy } from "@/lib/actions/pharmacy.actions";


type Props = {
  params: {
    pharmacyId: string;
  }
}
export default async function AllDrugs({ params }: Props) {
  const userId = await getUserId()
  const pharmacy = JSON.parse((await getPharmacy(userId!) as string)) as Pharmacy

  const drugs = await getDrugsBasedOnPharmacyId(pharmacy.pharmacy._id!)
  const parsedDrugs = JSON.parse(drugs!)

  // TODO:  check if drug has expired and show it
  return (
    <section className="p-5">
     <AddProduct />
     <section className="mt-10">
     <Table>
      <TableCaption>All drugs</TableCaption>
      <TableHeader>
       <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Prescription</TableHead>
        <TableHead>Stock</TableHead>
        <TableHead>Expiry</TableHead>
        <TableHead>Actions</TableHead>
        <TableHead>Expired</TableHead>
       </TableRow>
      </TableHeader>
      <TableBody>
       {parsedDrugs.drugs?.map((drug: DrugType) => (
       <TableRow key={drug._id}>
        <TableCell>{drug.name}</TableCell>
        <TableCell>{drug.category}</TableCell>
        <TableCell>₵{drug.price}</TableCell>
        <TableCell>{drug.require_prescription ? "true": "false"}</TableCell>
        <TableCell>{drug.stock_quantity}</TableCell>
        <TableCell>{drug.expiry_date}</TableCell>
        <TableCell className="flex items-center space-x-2">
          <TooltipProvider>
           <Tooltip>
            <TooltipTrigger asChild>
             <TiEdit
              fontSize={20}
              className="text-green-500 cursor-pointer"
             />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-black rounded">
             <p>Edit drug</p>
            </TooltipContent>
           </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
           <Tooltip>
            <TooltipTrigger asChild>
             <MdDelete
              fontSize={20}
              className="text-red-500 cursor-pointer"
             />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-black rounded">
             <p>Delete drug</p>
            </TooltipContent>
           </Tooltip>
          </TooltipProvider>
        </TableCell>
        {/* THIS SHOULD BE CHANGED */}
        <TableCell>No</TableCell>
       </TableRow>
       ))}
      </TableBody>
     </Table>
     </section>
    </section>
  )
}
