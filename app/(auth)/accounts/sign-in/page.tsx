"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signInFormSchema } from "@/lib/validators"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpFormInitialValues } from "@/lib/utils"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { checkUserByEmail, getUserRole, setUserId } from "@/lib/actions/customer.actions"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function Signin() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [userRole, setUserRole] = useState("")
  const [user, setUser] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: signUpFormInitialValues,
  })
   
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
   const formData = {
    email: values.email,
    password: password
   }

   const role = await getUserRole() || userRole
   
   const user: any = await checkUserByEmail(formData.email, role as string)

   if (!JSON.parse(user!).isExist) {
    setUser("this email does not exist")
    return
   }

   if (!role) {
    setError("please select a role")
    return
   }

   if (role == "customer") {
    await setUserId(JSON.parse(user).customer._id)
   } else if (role === "pharmacist") {
    await setUserId(JSON.parse(user).pharmacist._id)
   }

   try {
    setLoading("loading")
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
    setLoading("done")
    if (role == "customer") {
      router.push("/customer/onboarding")
    } else if (role == "pharmacist") {
      router.push("/pharmacist/onboarding")
    }
   } catch (error) {
    setError("this is not your fault, please try again")
   }

  }

  return (
    <section className="mt-10 rounded  bg-white shadow p-4 xl:w-[30%] mx-auto">
      <section className="mb-10">
       <h1 className="text-2xl font-bold">Sign in</h1>
       <p className="mt-1">
        By continuing, you agree to our <span className="text-blue-600">User Agreement</span>
        {" "}and acknowledge that you understand the <span className="text-blue-600">Privacy Policy.</span>
       </p>
      </section>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Select defaultValue={userRole} onValueChange={setUserRole}>
         <span className="">Which best describes you?</span>
         <SelectTrigger className="w-full border border-[#ccc] rounded">
          <SelectValue placeholder="select a value" />
         </SelectTrigger>
         <SelectContent className="bg-white">
          <SelectItem value="customer" className="cursor-pointer">Customer</SelectItem>
          <SelectItem value="pharmacist" className="cursor-pointer">Pharmacist</SelectItem>
         </SelectContent>
        </Select>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Email</FormLabel>
              <FormControl>
                <Input
                 className="border border-[#ccc] placeholder:text-gray-500 rounded"
                 placeholder="type your email" {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400"/>
            </FormItem>
          )}
        />

        <div>
         <label className="mb-3 block">Password</label>
         <input
          type="password"
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          className="block w-full border border-[#ccc] placeholder:text-gray-500
          outline-none active:outline-none pl-3 py-2
          active:border-none rounded"
          placeholder="****"
         />
        </div>

        <Button
         type="submit"
         className="bg-blue-600 text-white w-full rounded hover:bg-blue-600
         active:bg-blue-600 inactive:bg-blue-600 cursor-pointer"
         disabled={loading === "loading"}
        >
          {loading === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
        {user && <p className="text-red-500 text-center">{user}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
      <p className="mt-3">
       New here? <Link href="/accounts/sign-up"
       className="text-blue-600 underline">sign up</Link>
      </p>
     </Form>
    </section>
  )
}
