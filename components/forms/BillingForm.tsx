"use client"

import { Button } from "../ui/button"
import { billingFormSchema } from "@/lib/validators" 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form, FormControl,
  FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getPharmacyId } from "@/lib/actions/pharmacy.actions"
import { getUserId } from "@/lib/actions/customer.actions"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createOrder } from "@/lib/actions/orders.actions"
import { Loader2 } from "lucide-react"



export default function BillingForm({ drugId }: { drugId: string }) {
  const [loading, setLoading] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof billingFormSchema>>({
    resolver: zodResolver(billingFormSchema),
    defaultValues: {
      recipient_address: "",
      recipient_contact:""
    },
  })

  async function onSubmit(values: z.infer<typeof billingFormSchema>) {
    const pharmacyId = await getPharmacyId()
    const userId = await getUserId()

    // STATUS : pending, shipped, delivered 
    try {
      setLoading("loading")
      await createOrder({
        customer: userId!,
        pharmacy: pharmacyId!,
        drugs: drugId,
        status: "pending",
        values,
      })
      setLoading("done")
      toast.success("your order has been placed")
      router.push("/my-orders")
    } catch (error) {
      toast.error("something unexpected happen")
      setLoading("")
    }
    form.reset()
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="recipient_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                   className="border border-dark-500 bg-dark-400"
                   placeholder="bomso.." {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
          )}/>
          <FormField
            control={form.control}
            name="recipient_contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calling contact</FormLabel>
                <FormControl>
                  <Input
                   className="border border-dark-500 bg-dark-400"
                   placeholder="+233..."{...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
          )}/>
         <div>
          <p className="text-xs font-bold italic text-gray-400">**you only pay when you get the product</p>
          <Button
           type="submit"
           className="bg-blue-600 text-white 
           hover:bg-blue-600 active:bg-blue-600 rounded w-full cursor-pointer"
           disabled={loading === "loading"}
          >
            {loading == "loading" && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
            Place Order
          </Button>
         </div>
       </form>
      </Form>
    </section>
  )
}
