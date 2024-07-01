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
import { createUser } from "@/lib/actions/customer.actions"


export default function Signin() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: signInFormSchema,
  })
   
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
   const formData = {
    email: values.email,
    password: password
   }

   try {
    setLoading("loading")
    const { data } = await signInWithEmailAndPassword(auth, formData.email, formData.password)
    // await createUser(formData)

    setLoading("done")
   } catch (error) {
    throw error
   }

  }

  return (
    <section className="xl:w-[30%] mx-auto">
      <section className="mt-10 mb-10">
       <h1 className="text-2xl font-bold">Sign in</h1>
       <p className="mt-1">
        By continuing, you agree to our <span className="text-blue-600">User Agreement</span>
        {" "}and acknowledge that you understand the <span className="text-blue-600">Privacy Policy.</span>
       </p>
      </section>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-2">Email</FormLabel>
              <FormControl>
                <Input
                 className="account-form_input placeholder:text-gray-500"
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
          active:outline-none pl-3 py-2 active:border-none"
          placeholder="****"
         />
        </div>

        <Button
         type="submit"
         className="bg-blue-600 text-white w-full rounded-lg hover:bg-blue-600
         active:bg-blue-600 inactive:bg-blue-600 cursor-pointer"
        >
          Submit
        </Button>
      </form>
      <p className="mt-3">
       New to pharmX? <Link href="/accounts/sign-up"
       className="text-blue-600 underline">sign up</Link>
      </p>
     </Form>
    </section>
  )
}
