"use client"

import Image from "next/image"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { customerFormSchema } from "@/lib/validators"
import { customerFormInitialValues, uploadImageToFirebase } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getUserId, getUserInfo, updateCustomer } from "@/lib/actions/customer.actions"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"



export default function CustomerOnboardingForm() {
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [file, setFile] = useState<FileList | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: customerFormInitialValues,
  })

  useEffect(() => {
   const getUser = async () => {
    const userId = (await getUserId()) as string
    const user = JSON.parse(await getUserInfo("customer", userId) as string) as Customer
   
    if (user.customer.onboarded) {
      router.push("/pharmacies")
    }
  }

   getUser()

  }, [])

  async function onSubmit(values: z.infer<typeof customerFormSchema>) {
    const fileToUpload = file && file[0]

    if (!fileToUpload) {
      toast.error("please upload an image")
      return
    }

    try {
      setLoading("loading")
      const uploadedFileUrl = await uploadImageToFirebase("profile", fileToUpload)
      const customerId = await getUserId()
      await updateCustomer({
        ...values,
        image: uploadedFileUrl,
        onboarded: true,
      }, customerId!)
      setLoading("done")
      toast.success("info updated")
      router.push("/pharmacies")
    } catch (error) {
      toast.error("something went wrong, please try again")
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
        onChange={event => setFile(event.target.files)}
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
                <Input type="number" className="border border-[#ccc] rounded" placeholder="" {...field} />
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
                <Input className="border border-[#ccc] rounded" placeholder="" {...field} />
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
                <Input className="border border-[#ccc] rounded" placeholder="" {...field} />
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
                <Input className="border border-[#ccc] rounded" placeholder="" {...field} />
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
                <Input className="border border-[#ccc] rounded" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
         />

        <Button
         type="submit"
         className="bg-blue-600 text-white w-full rounded hover:bg-blue-600 active:bg-blue-600"
         disabled={loading === "loading"}
        >
          {loading === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Submit
        </Button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
     </Form>
    </div>
    </section>
  )
}
