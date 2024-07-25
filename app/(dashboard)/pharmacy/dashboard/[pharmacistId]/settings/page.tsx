"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { settingsFormSchema } from "@/lib/validators"
import { settingsInitialValues, uploadImageToFirebase } from "@/lib/utils"
import { useState, useEffect } from "react"
import { getPharmacy, getPharmacyId, updatePharmacy } from "@/lib/actions/pharmacy.actions"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { getUserId } from "@/lib/actions/customer.actions"
import { Loader2 } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Settings() {
  const [pharmacyInfo, setPharmacyInfo] = useState<Pharmacy | null>(null)
  const [loading, setLoading] = useState("")
  const pathname = usePathname()


  useEffect(() => {
    const getPharmacyInfo = async () => {
      const userId = await getUserId()
      const pharmacy = JSON.parse((await getPharmacy(userId!) as string)) as Pharmacy
      
      setPharmacyInfo(pharmacy)
    }
    getPharmacyInfo()
  }, [])

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      ...settingsInitialValues,
      name: pharmacyInfo?.pharmacy.name || "",
      location: pharmacyInfo?.pharmacy.location || "",
      address: pharmacyInfo?.pharmacy.address || "",
      email: pharmacyInfo?.pharmacy.email || "",
    },
  })
  
  async function onSubmit(values: z.infer<typeof settingsFormSchema>) {
    try {
      setLoading("loading")
      await updatePharmacy({
        ...values,
      }, pharmacyInfo?.pharmacy._id!, pathname)
      setLoading("done")
      toast.success("info updated!")
    } catch (error) {
      toast.error("something went wrong, please try again")
      setLoading("")
    }
  }


  return (
    <section className="p-10 lg:p-0">
     <h1 className="text-xl font-bold mt-20">Settings</h1>
     <section className="mt-10">
      <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 space-x-3">
          <FormField
           control={form.control}
           name="name"
           render={({ field }) => (
            <FormItem>
              <FormLabel>Pharmacy name</FormLabel>
              <FormControl>
                <Input placeholder="pharmacy-name" className="border border-dark-500 bg-dark-400 rounded" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
            )}
          />
          <FormField
            control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input className="border border-dark-500 bg-dark-400 rounded" placeholder="Location" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 space-x-3">
          <FormField
           control={form.control}
           name="address"
           render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input className="border border-dark-500 bg-dark-400 rounded" placeholder="address" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
            )}
          />
          <FormField
           control={form.control}
           name="email"
           render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="border border-dark-500 bg-dark-400 rounded" placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
            )}
          />
        </div>
        <Button
         type="submit"
         className="bg-blue-600 text-white rounded
         px-20 hover:bg-blue-600 active:bg-blue-600"
         disabled={loading === "loading"}
        >
          {loading === "loading" && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
          Save
        </Button>
       </form>
      </Form>
     </section>
    </section>
  )
}
