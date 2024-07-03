"use client"

import { z } from "zod"
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signUpFormSchema } from "@/lib/validators"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { signUpFormInitialValues } from "@/lib/utils"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useState } from "react"
import Link from "next/link"
import { checkUserByEmail, createUser, setUserRole } from "@/lib/actions/customer.actions"
import { useRouter } from "next/navigation"


export default function Signup() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [userExist, setUserExist] = useState("")
  const [role, setRole] = useState("")
  const [hasRole, setHasRole] = useState("")
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpFormInitialValues,
  })

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
   const formData = {
    name: values.name,
    email: values.email,
    password: password
   }

   if (!role) {
    setHasRole("select a customer or pharamcist")
    return
   }

   const user = await checkUserByEmail(values.email, role)
   const parsedUser  = JSON.parse(user!)

   if (parsedUser.isExist) {
    setUserExist("this email is already registered")
    return
   }

   
   try {
    setLoading("loading")
    await createUserWithEmailAndPassword(auth, formData.email, formData.password)
    await createUser(formData, role)
    await setUserRole(role)
    setLoading("done")
    router.push("/accounts/sign-in")
   } catch (error) {
     setError("this is our fault, please try again!")
     setLoading("")
   }
  }

  return (
    <section className="xl:w-[30%] mx-auto">
      <section className="mt-10 mb-10">
       <h1 className="text-2xl font-bold">Sign up</h1>
       <p className="mt-1">
        By continuing, you agree to our <span className="text-blue-600">User Agreement</span>
        {" "}and acknowledge that you understand the <span className="text-blue-600">Privacy Policy.</span>
       </p>
      </section>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Select defaultValue={role} onValueChange={setRole}>
         <span className="text-light-1">Which best describes you?</span>
         <SelectTrigger className="w-full account-form_input">
          <SelectValue placeholder="select a value" />
         </SelectTrigger>
         <SelectContent className="account-form_input">
          <SelectItem value="customer" className="cursor-pointer">Customer</SelectItem>
          <SelectItem value="pharmacist" className="cursor-pointer">Pharmacist</SelectItem>
         </SelectContent>
        </Select>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-2">Full Name</FormLabel>
              <FormControl>
                <Input className="account-form_input placeholder:text-gray-500 rounded"
                placeholder="type your full name" {...field} />
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
              <FormLabel className="text-light-2">Email</FormLabel>
              <FormControl>
                <Input
                 className="account-form_input placeholder:text-gray-500 rounded"
                 placeholder="type your email" {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400"/>
            </FormItem>
          )}
        />

        <div>
         <label className="text-light-2 mb-2 block">Password</label>
         <input
          type="password"
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          className="block w-full account-form_input placeholder:text-gray-500
          border border-gray-500 outline-none active:outline-none
          pl-3 py-2 active:border-none rounded"
          placeholder="****"
         />
        </div>

        <Button
         type="submit"
         className="bg-blue-600 text-white w-full hover:bg-blue-600
         active:bg-blue-600 inactive:bg-blue-600 cursor-pointer rounded"
         disabled={loading === "loading"}
        >
          {loading === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
        {userExist && <p className="text-red-500 text-center">{userExist}</p>}
        {hasRole && <p className="text-red-500 text-center">{hasRole}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
      <p className="mt-3">
       Already have an account? <Link href="/accounts/sign-in"
       className="text-blue-600 underline">sign in</Link>
      </p>
     </Form>
    </section>
  )
}
