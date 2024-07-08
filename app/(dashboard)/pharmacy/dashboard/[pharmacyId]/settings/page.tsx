"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { settingsFormSchema } from "@/lib/validators"
import { settingsInitialValues } from "@/lib/utils"
import { useState, useEffect } from "react"
import { getPharmacy, getPharmacyId, updatePharmacy } from "@/lib/actions/pharmacy.actions"
import { toast } from "sonner"

export default function Settings() {
  const [pharmacyInfo, setPharmacyInfo] = useState<Pharmacy | null>(null)
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const getPharmacyInfo = async () => {
      // pharmacy id from cookie
      const pharmacyId = await getPharmacyId()
      const pharmacy = await getPharmacy(pharmacyId!)

      const parsedPharmacy = JSON.parse(pharmacy!)
      console.log(parsedPharmacy)
      // console.log(JSON.parse(pharmacy))
      setPharmacyInfo(parsedPharmacy)
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
      const pharmacyId = await getPharmacyId()
      await updatePharmacy(values, pharmacyId!)
      setLoading("done")
    } catch (error) {
      setError("something went wrong, please try again")
    }
  }


  return (
    <section>
     <h1 className="text-xl font-bold mt-5">Settings</h1>
     <section className="mt-8">
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
                <Input className="account-form_input" placeholder="" {...field} />
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
                <Input className="account-form_input" placeholder="Location" {...field} />
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
                <Input className="account-form_input" placeholder="address" {...field} />
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
                <Input className="account-form_input" placeholder="@example.com" {...field} />
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
          Save
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
       </form>
      </Form>
      {loading === "done" && (
        <section className="text-black rounded">
          {toast("Pharmacy Info has been updated")}
        </section>
      )}
     </section>
    </section>
  )
}
