"use client"

import { Button } from "@/components/ui/button"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form, FormControl, FormDescription,
  FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 import { addProductSchema } from "@/lib/validators"
import { addProductInitialValues, uploadImageToFirebase } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChangeEvent, useState } from "react"
import { getPharmacyId } from "@/lib/actions/pharmacy.actions"
import { createDrug } from "@/lib/actions/drug.actions"
import { usePathname } from "next/navigation"



export default function AddProduct() {
  const pathname = usePathname()
  const [drugImage, setDrugImage] = useState<FileList | null>(null)

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: addProductInitialValues,
  })

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDrugImage(event.target.files)
  }

  async function onSubmit(values: z.infer<typeof addProductSchema>) {

    const drugImageToUpload = drugImage && drugImage[0]
    if (!drugImageToUpload) return

    const uploadedDrugImageUrl = await uploadImageToFirebase("drugs", drugImageToUpload)
    const pharmacyId = await getPharmacyId()

    const drugData = {
      ...values,
      image: uploadedDrugImageUrl,
      pharmacy: pharmacyId,
    }
    await createDrug(drugData, pathname)

    form.reset()
  }

  return (
    <section className="flex items-center justify-end">
     <AlertDialog>
      <AlertDialogTrigger>
       <div>
        <Button className="bg-blue-600 text-white
        active:bg-blue-600 hover:bg-blue-600 rounded cursor-pointer">Add Product</Button>
       </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded border border-gray-700">
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <AlertDialogHeader>
         <AlertDialogTitle>Add Product</AlertDialogTitle>
          <AlertDialogDescription>
           <section>
            <FormField
             control={form.control}
             name="name"
             render={({ field }) => (
             <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="border border-[#ccc] rounded" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
             </FormItem>
            )}
            />

            {/* drug image */}
            <div className="w-full items-center gap-1.5 mt-3">
             <Label htmlFor="Product image mb-3">Image</Label>
             <Input
              id="product image"
              type="file"
              className="border border-[#ccc] rounded file:text-blue-600
              w-full mt-2"
              onChange={handleImageChange}
             />
            </div>

            {/* price and category */}
            <div className="grid grid-cols-2 gap-2 mt-3 mb-5">
             <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. antibiotics" className="border border-[#ccc] rounded" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
             />
             <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input className="border border-[#ccc] rounded" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
             )}
             />
            </div>

            <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="stock_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input className="border border-[#ccc] rounded" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiry_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry</FormLabel>
                  <FormControl>
                    <Input className="border border-[#ccc] rounded" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            </div>

            <div className="mt-4">
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input className="border border-[#ccc] rounded" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
               )}
             />
            </div>

            {/* require prescription */}
            <FormField
              control={form.control}
              name="require_prescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                   <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                     id="prescription"
                     className="border border-[#ccc] accent-blue-600
                    focus:accent-blue-600"
                     checked={field.value}
                     onCheckedChange={field.onChange}
                    />
                    <label
                     htmlFor="terms"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
                     peer-disabled:opacity-70"
                    >
                     Require prescription
                    </label>
                   </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
               )}
            />

           </section>
          </AlertDialogDescription>
        </AlertDialogHeader>
       <AlertDialogFooter>
       <AlertDialogCancel className="border-none outline-none cursor-pointer">
        Cancel
       </AlertDialogCancel>
       <AlertDialogAction>
        <Button className="bg-blue-600 text-white rounded border-none outline-none
       hover:bg-blue-600 active:bg-blue-600 cursor-pointer">
          Add
        </Button>
       </AlertDialogAction>
       </AlertDialogFooter>
       </form>
      </Form>
     </AlertDialogContent>
    </AlertDialog>
    </section>
  )
}
