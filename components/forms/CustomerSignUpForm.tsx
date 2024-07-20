"use client"

import { z } from "zod"
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signUpFormSchema } from "@/lib/validators"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpFormInitialValues } from "@/lib/utils"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useState } from "react"
import Link from "next/link"
import { checkUserByEmail, createUser, setUserId, setUserRole } from "@/lib/actions/customer.actions"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MdOutlineKey } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast"



export default function CustomerSignUpForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [userExist, setUserExist] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")
  
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpFormInitialValues,
  })


  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {

    const formData = {
      ...values,
      role: "customer",
      password,
    }
    
    if (+formData.age < 19) {
      toast.error("you're underage")
      return
    }
 
    const user = await checkUserByEmail(values.email)
    const parsedUser  = JSON.parse(user!)
 
    if (parsedUser.isExist) {
     toast.error("this email is already registered")
     return
    }
    
    try {
     setLoading("loading")
     await createUserWithEmailAndPassword(auth, formData.email, formData.password)
     const customer = JSON.parse((await createUser(formData)) as string) as CustomerResponse
     setLoading("done")
     toast.success("account created!")
     router.push("/accounts/sign-in")
    } catch (error) {
      toast.error("this is our fault, please try again!")
      setLoading("")
    }
  }

  return (
    <section>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
       <div className="grid grid-cols-2 gap-2">
        <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Full name</FormLabel>
          <FormControl>
            <div className="flex border border-dark-500 bg-dark-400 rounded">
             <Image
              src="/assets/icons/user.svg"
              alt="user"
              width={24}
              height={24}
              className="ml-2"
             />
             <Input
              className="border-0 placeholder:text-dark-600 "
              placeholder="John Doe"
              {...field}
             />
            </div>
           </FormControl>
          <FormMessage className="text-red-400" />
         </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="email"
         render={({ field }) => (
          <FormItem>
            <FormLabel className="">Email</FormLabel>
            <FormControl>
             <div className="flex border border-dark-500 bg-dark-400 rounded">
              <Image
               src="/assets/icons/email.svg"
               alt="user"
               width={24}
               height={24}
               className="ml-2"
              />
              <Input
               className="border-0 placeholder:text-dark-600 "
               placeholder="John Doe"
               {...field}
               />
             </div>
            </FormControl>
           <FormMessage className="text-red-400"/>
          </FormItem>
         )}
        />
       </div>

       <div className="grid grid-cols-2 gap-2">
        <FormField
         control={form.control}
         name="address"
         render={({ field }) => (
         <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <div className="flex items-center border border-dark-500 bg-dark-400 rounded">
             <FaAddressBook fontSize={23} className="text-gray-500 ml-2"/>
             <Input
              className="border-0 placeholder:text-dark-600 "
              placeholder="P.O.Box ..."
              {...field}
             />
            </div>
           </FormControl>
          <FormMessage className="text-red-400" />
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
              <PhoneInput
               defaultCountry="GH"
               international
               withCountryCallingCode
               value={field.value as string}
               onChange={field.onChange}
               className="mt-2 h-[42px] rounded px-3 text-sm border bg-dark-400
               placeholder:text-dark-600 border-dark-500"
              />
            </FormControl>
           <FormMessage className="text-red-400"/>
          </FormItem>
         )}
        />
       </div>

       <div className="grid grid-cols-2 gap-2">
        <FormField
         control={form.control}
         name="age"
         render={({ field }) => (
         <FormItem>
          <FormLabel>Age</FormLabel>
          <FormControl>
            <div className="flex items-center border border-dark-500 bg-dark-400 rounded">
             <Input
              className="border-0 placeholder:text-dark-600 "
              placeholder="19+"
              {...field}
             />
            </div>
           </FormControl>
          <FormMessage className="text-red-400" />
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
             <div className="flex items-center border border-dark-500 bg-dark-400 rounded">
              <FaLocationDot fontSize={23} className="ml-2 text-gray-500" />
              <Input
               className="border-0 placeholder:text-dark-600 "
               placeholder="Ayeduase"
               {...field}
               />
             </div>
            </FormControl>
           <FormMessage className="text-red-400"/>
          </FormItem>
         )}
        />
       </div>

       <FormField
         control={form.control}
         name="id_number"
         render={({ field }) => (
         <FormItem>
          <FormLabel>National id <span className="text-xs text-gray-500">**ghana card</span></FormLabel>
          <FormControl>
            <div className="flex items-center border border-dark-500 bg-dark-400 rounded">
             <Input
              className="border-0 placeholder:text-dark-600 "
              placeholder="GHA-"
              {...field}
             />
            </div>
           </FormControl>
          <FormMessage className="text-red-400" />
         </FormItem>
         )}
        />

        <div>
         <label className="mb-2 block text-sm">Password</label>
         <div className="w-full placeholder:text-gray-500 outline-none pl-3 py-2
           rounded border border-dark-500 bg-dark-400 flex ">
          <MdOutlineKey fontSize={23} className="text-gray-500" />
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
        <Button
         type="submit"
         className="bg-blue-600 text-white w-full hover:bg-blue-600
         active:bg-blue-600 inactive:bg-blue-600 cursor-pointer rounded"
         disabled={loading === "loading"}
        >
          {loading === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create an account
        </Button>
        {userExist && <p className="text-red-500 text-center">{userExist}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
      <div className="flex items-center justify-between">
       <p className="mt-3">
        Already have an account? <Link href="/accounts/sign-in"
        className="text-blue-600 underline">sign in</Link>
       </p>
       {/* REDESIGN sign in part */}
       <Link href="/join-us/register-your-pharmacy" className="mt-3 text-blue-600 text-xs underline">
        Register your pharmacy
       </Link>
      </div>
     </Form>
    </section>
  )
}
