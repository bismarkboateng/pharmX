"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signInFormSchema } from "@/lib/validators"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInFormInitialValues } from "@/lib/utils"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { checkUserByEmail, getUserRole, setUserId } from "@/lib/actions/customer.actions"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Image from "next/image"
import { MdOutlineKey } from "react-icons/md"


export default function SignInForm() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [userRole, setUserRole] = useState("")
  const [user, setUser] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: signInFormInitialValues,
  })   

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const formData = {
     email: values.email,
     password: password
    } 
    
    const user: SignInUserFromDB = JSON.parse(await checkUserByEmail(formData.email))
 
    if (!user.isExist) {
     toast.error("this email does not exist")
     return
    }

    await setUserId(user.user._id)

    try {
     setLoading("loading")
     await signInWithEmailAndPassword(auth, formData.email, formData.password)
     toast.success("signed in")
     setLoading("done")

     if (user.user.role == "customer") {
       router.push("/pharmacies")
     } else if (user.user.role == "pharmacist") {
       router.push("/pharmacist/onboarding")
     }

    } catch (error) {
     toast.error("this is not your fault, please try again")
     setLoading("")
    }
 
   }

  return (
    <section>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
          />
         </div>
        </div>

        <Button
         type="submit"
         className="bg-blue-600 text-white w-full rounded hover:bg-blue-600
         active:bg-blue-600 inactive:bg-blue-600 cursor-pointer"
         disabled={loading === "loading"}
        >
          {loading === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
        {user && <p className="text-red-500 text-center">{user}</p>}
      </form>
      <p className="mt-3">
       New here? <Link href="/accounts/sign-up"
       className="text-blue-600 underline">sign up</Link>
      </p>
     </Form>
    </section>
  )
}
