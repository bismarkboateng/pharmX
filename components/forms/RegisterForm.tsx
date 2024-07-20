"use client"

import { registerPharmacySchema } from "@/lib/validators"
import { registerPharmacyInitialValues } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { createPharmacist, updatePharmacist } from "@/lib/actions/pharmacist.actions"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { auth } from "@/lib/firebase"
import toast from "react-hot-toast"
import { createPharmacy } from "@/lib/actions/pharmacy.actions"



export default function RegisterForm() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const form = useForm<z.infer<typeof registerPharmacySchema>>({
        resolver: zodResolver(registerPharmacySchema),
        defaultValues: registerPharmacyInitialValues,
    })

   async function onSubmit(values: z.infer<typeof registerPharmacySchema>) {
      console.log("submit button clicked")
      console.log({
        ...values,
        password
      })

      try {
        setLoading("loading")
        await createUserWithEmailAndPassword(auth, values.email, password)
        const response = JSON.parse((await createPharmacist({
          name: values.name,
          email: values.email,
          address: values.address,
          license_number: values.license,
          experience_level: values.experience_level,
        })) as string) as { msg: string, pharmacist_id : string}
        
        await createPharmacy({
          pharmacist: response.pharmacist_id,
          name: values.pharmacy_name,
          description: values.description,
          location: values.pharmacy_location,
          email: values.pharmacy_email,
          working_hours: values.working_hours,
          address: values.pharmacy_address,
        })
        setLoading("done")
        toast.success("account created!")
        router.push("/accounts/sign-in")
      } catch (error) {
        toast.error("this is our fault, please try again")
        setLoading("")
      }
    }

    return (
        <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <section className="flex gap-2">
           <section className="w-[50%] p-3 space-y-2">
            <h3 className="text-xl font-bold mb-5">Fill in your info</h3>
             {/* full name and email */}
             <div className="grid grid-cols-2 gap-2 mt-2">
              <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                <FormItem>
                 <FormLabel>Full name</FormLabel>
                 <FormControl>
                 <Input placeholder="name" {...field}
                 className="border border-dark-500 bg-dark-400 rounded" />
                 </FormControl>
                 <FormMessage className="text-red-500" />
                </FormItem>
              )}/>
              <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                <FormItem>
                 <FormLabel>Email</FormLabel>
                 <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field}
                   className="border border-dark-500 bg-dark-400 rounded" />
                 </FormControl>
                 <FormMessage className="text-red-500" />
                </FormItem>
              )}/>
             </div>

             {/* license and years of experience */}
             <div className="grid grid-cols-2 gap-2 mt-2 mb-2">
              <FormField
               control={form.control}
               name="license"
               render={({ field }) => (
                <FormItem>
                 <FormLabel>License</FormLabel>
                 <FormControl>
                  <Input placeholder="****" {...field}
                   className="border border-dark-500 bg-dark-400 rounded"/>
                 </FormControl>
                 <FormMessage className="text-red-500" />
                </FormItem>
              )}/>
              <FormField
               control={form.control}
               name="experience_level"
               render={({ field }) => (
                <FormItem>
                <FormLabel>Year&apos;s of experience</FormLabel>
                 <FormControl>
                  <Input placeholder="3+" {...field}
                   className="border border-dark-500 bg-dark-400 rounded" />
                 </FormControl>
                 <FormMessage className="text-red-500" />
                </FormItem>
              )}/>
              </div>

              <FormField
               control={form.control}
               name="phone"
               render={({ field }) => (
                <FormItem>
                 <FormLabel>Phone number</FormLabel>
                 <FormControl>
                  <Input placeholder="+233 *** *** ****" {...field}
                   className="border border-dark-500 bg-dark-400 rounded" />
                 </FormControl>
                 <FormMessage className="text-red-500" />
                </FormItem>
              )}/>
              <FormField
               control={form.control}
               name="address"
               render={({ field }) => (
                <FormItem>
                 <FormLabel>Address</FormLabel>
                 <FormControl>
                  <Input placeholder="P.O..." {...field}
                   className="border border-dark-500 bg-dark-400 rounded"
                  />
                 </FormControl>
                 <FormMessage className="text-red-500" />
                </FormItem>
              )}/>

            <div>
            <label className="mb-2 block text-sm">Password</label>
             <div className="w-full placeholder:text-gray-500 outline-none pl-3 py-2
              rounded border border-dark-500 bg-dark-400 flex ">
              <input
               type="password"
               name="password"
               value={password}
               onChange={event => setPassword(event.target.value)}
               className="border-0 outline-0 bg-dark-400 ml-3"
               placeholder="****"
              />
             </div>
            </div>

           </section>

           <section className="w-[50%] p-3 space-y-2">
              <h3 className="text-xl font-bold mb-5">Fill in your pharmacy info</h3>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <FormField
                 control={form.control}
                 name="pharmacy_name"
                 render={({ field }) => (
                  <FormItem>
                   <FormLabel>Pharmacy Name</FormLabel>
                    <FormControl className="">
                     <Input placeholder="name" {...field}
                      className="border border-dark-500 bg-dark-400 rounded"
                     />
                   </FormControl>
                   <FormMessage className="text-red-500" />
                  </FormItem>
                )}/>

                <FormField
                 control={form.control}
                 name="pharmacy_location"
                 render={({ field }) => (
                  <FormItem>
                   <FormLabel>Location</FormLabel>
                    <FormControl>
                     <Input placeholder="bomso" {...field}
                      className="border border-dark-500 bg-dark-400 rounded"
                     />
                   </FormControl>
                   <FormMessage className="text-red-500" />
                  </FormItem>
                )}/>
               </div>


               <div className="grid grid-cols-2 gap-2 mt-2">
                <FormField
                 control={form.control}
                 name="working_hours"
                 render={({ field }) => (
                  <FormItem>
                   <FormLabel>Working hours</FormLabel>
                    <FormControl>
                     <Input placeholder="8am-8pm" {...field}
                      className="border border-dark-500 bg-dark-400 rounded"
                     />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                 )}/>

                <FormField
                 control={form.control}
                 name="pharmacy_address"
                 render={({ field }) => (
                  <FormItem>
                   <FormLabel>Address</FormLabel>
                    <FormControl>
                     <Input placeholder="P.O.Box Am 328" {...field}
                      className="border border-dark-500 bg-dark-400 rounded"
                     />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}/>
                </div>

                <FormField
                 control={form.control}
                 name="pharmacy_email"
                 render={({ field }) => (
                  <FormItem>
                   <FormLabel>Email</FormLabel>
                    <FormControl>
                     <Input placeholder="johndoe@gmail.com" {...field}
                      className="border border-dark-500 bg-dark-400 rounded"
                     />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                   </FormItem>
                 )}/>

                <FormField
                 control={form.control}
                 name="description"
                 render={({ field }) => (
                  <FormItem>
                   <FormLabel>Description</FormLabel>
                   <FormControl>
                    <Textarea
                     placeholder="pharmacy description" {...field}
                     className="border border-dark-500 bg-dark-400 rounded"
                    />
                   </FormControl>
                   <FormMessage className="text-red-500" />
                  </FormItem>
                )}/>
           </section>

          </section>

          <Button
           type="submit"
           className="bg-blue-600 text-white w-[20%] rounded cursor-pointer
           active:bg-blue-600 hover:bg-blue-600 ml-3"
           disabled={loading === "loading"}
          >
            {loading === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
         </form>
        </Form>
    )
}
