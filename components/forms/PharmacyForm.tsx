"use client"

import { pharmacyInitialValues } from "@/lib/utils"
import { pharmacySchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { createPharmacy, setPharmacyId } from "@/lib/actions/pharmacy.actions"


export default function PharmacyForm() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const router = useRouter()
  // add an image state

  const form = useForm<z.infer<typeof pharmacySchema>>({
    resolver: zodResolver(pharmacySchema),
    defaultValues: pharmacyInitialValues,
  })

  async function onSubmit(values: z.infer<typeof pharmacySchema>) {
    const data = {
        name: values.pharmacy_name,
        description: values.description,
        location: values.pharmacy_location,
        address: values.pharmacy_address,
        email: values.pharmacy_email,
        working_hours: values.working_hours,
    }

    try {
      setLoading("loading")
      const pharmacy:any = await createPharmacy(data)
      const pharmacyId = JSON.parse(pharmacy).pharmacy._id
      await setPharmacyId(pharmacyId)
      router.push(`/pharmacy/dashboard/${pharmacyId}`)
      setLoading("done")
    } catch (error) {
      setError("error creating pharmacist")
    }
  }

  return (
    <section className="w-full">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">

        <div className="grid grid-cols-2 gap-2 mt-4">
         <FormField
          control={form.control}
          name="pharmacy_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pharmacy Name</FormLabel>
              <FormControl className="">
                <Input placeholder="name" {...field}
                className="account-form_input rounded"/>
              </FormControl>
            </FormItem>
          )}
         />
         <FormField
          control={form.control}
          name="pharmacy_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl className="">
                <Input placeholder="" {...field}
                className="account-form_input rounded"/>
              </FormControl>
            </FormItem>
          )}
         />
        </div>

     
        <div className="grid grid-cols-2 gap-2 mt-2">
         <FormField
          control={form.control}
          name="working_hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Working hours</FormLabel>
              <FormControl>
                <Input placeholder="" {...field}
                className="account-form_input rounded"/>
              </FormControl>
            </FormItem>
          )}
         />
         <FormField
          control={form.control}
          name="pharmacy_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field}
                className="account-form_input rounded"/>
              </FormControl>
            </FormItem>
          )}
         />
        </div>

        <FormField
          control={form.control}
          name="pharmacy_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="@example.com" {...field}
                className="account-form_input rounded"/>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
               <Textarea
                placeholder=""
                { ...field }
                className="account-form_input rounded"
               />
              </FormControl>
            </FormItem>
          )}
        />
    
        <Button
         type="submit"
         className="bg-blue-600 text-white w-full rounded
         cursor-pointer active:bg-blue-600 hover:bg-blue-600"
         disabled={loading === "loading"}
        >
          {loading === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
     </Form>
    </section>
  )
}
