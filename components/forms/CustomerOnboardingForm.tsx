"use client"

import Image from "next/image"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { customerFormSchema } from "@/lib/validators"
import { customerFormInitialValues } from "@/lib/utils"
import { useState } from "react"
import { getUserId, updateCustomer } from "@/lib/actions/customer.actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export default function CustomerOnboardingForm() {
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: customerFormInitialValues,
  })

  async function onSubmit(values: z.infer<typeof customerFormSchema>) {
    try {
      setLoading("loading")
      const customerId = await getUserId()
      await updateCustomer(values, customerId!)
      setLoading("done")
      router.push("/pharmacies")
    } catch (error) {
      setError("something went wrong, please try again")
    }
  }

  return (
    <section className="mt-10">
     <div className="flex items-center gap-2 mb-3">
      <Image
       src="/assets/defaultUser.png"
       alt="default profile"
       width={65}
       height={65}
       className="rounded-full"
      />
       <Input
        id="picture"
        type="file"
        className="file:text-blue-500 border-none"
        // value={}
        // onChange={}
       />
     </div>
     
    <div className="mt-10">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* age and location */}
        <div className="grid grid-cols-2 gap-2">
         <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" className="account-form_input rounded" placeholder="" {...field} />
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
                <Input className="account-form_input rounded" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
         />
        </div>

        {/* id and contact */}
        <div className="grid grid-cols-2 gap-2">
         <FormField
          control={form.control}
          name="ID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>National ID number</FormLabel>
              <FormControl>
                <Input className="account-form_input rounded" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
         />
         <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input className="account-form_input rounded" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
         />
        </div>

        {/* customer address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input className="account-form_input rounded" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
         />

        <Button
         type="submit"
         className="bg-blue-600 text-white w-full rounded hover:bg-blue-600 active:bg-blue-600"
        >
          Submit
        </Button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
     </Form>
     {loading === "done" && (
        <section className="text-black rounded">
          {toast("Your info has been updated!")}
        </section>
      )}
    </div>
    </section>
  )
}
