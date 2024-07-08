"use client"

import { pharmacistInitialValues } from "@/lib/utils"
import { pharmacistSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { updatePharmacist } from "@/lib/actions/pharmacist.actions"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

type PharmacistFormProps = {
  pharmacist: {
    _id: string;
    name: string;
    email: string;
  }
}

export default function PharmacistForm({ pharmacist }: PharmacistFormProps) {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const router = useRouter()
  // add an image state

  const form = useForm<z.infer<typeof pharmacistSchema>>({
    resolver: zodResolver(pharmacistSchema),
    defaultValues: {
      ...pharmacistInitialValues,
      email: pharmacist.email || "",
      name: pharmacist.name || ""
    },
  })

  async function onSubmit(values: z.infer<typeof pharmacistSchema>) {
    console.log("function executed")
    const data = {
      name: values.name,
      email: values.email,
      license_number: values.license,
      phone: values.phone,
      experience_level: values.experience_level,
      address: values.address,
      bio: values.bio,
      onboardered: true,
    }

    try {
      setLoading("loading")
      await updatePharmacist(data)
      setLoading("done")
      router.push("/pharmacy/onboarding")
    } catch (error) {
      setError("error creating pharmacist")
    }
  }

  return (
    <section className="w-full">
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
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">

        {/* full name and email */}
        <div className="grid grid-cols-2 gap-2 mt-2">
         <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl className="">
                <Input placeholder="name" {...field}
                className="account-form_input rounded"/>
              </FormControl>
            </FormItem>
          )}
         />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="">
                <Input placeholder="@example.com" {...field}
                className="account-form_input rounded"/>
              </FormControl>
            </FormItem>
          )}
         />
        </div>

        {/* license and years of experience */}
        <div className="grid grid-cols-2 gap-2 mt-2">
         <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License</FormLabel>
              <FormControl>
                <Input placeholder="****" {...field}
                className="account-form_input rounded"/>
              </FormControl>
            </FormItem>
          )}
         />
         <FormField
          control={form.control}
          name="experience_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year&apos;s of experience</FormLabel>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="+233 *** *** ****" {...field}
                className="account-form_input rounded"/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="P.O..." {...field}
                className="account-form_input rounded"/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
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
        //  onClick={onSubmit}
         className="bg-blue-600 text-white w-full rounded
         cursor-pointer active:bg-blue-600 hover:bg-blue-600"
         disabled={loading === "loading"}
        >
          {loading === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
        {error && <p className="text-center text-red-500">{error}</p>}
      </form>
     </Form>
    </section>
  )
}
