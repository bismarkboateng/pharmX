"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signInFormSchema } from "@/lib/validators"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { checkUserByEmail, setUserId } from "@/lib/actions/customer.actions"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Image from "next/image"
import { MdOutlineKey } from "react-icons/md"
import { MdEmail } from "react-icons/md";



export default function SignInForm() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [user, setUser] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: ""
    },
  })   

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const formData = {
     email: values.email,
     password: password
    }

    if (!formData.email || !formData.password) {
      toast.error("fields cannot be empty")
      return
    }

    try {
      setLoading("loading")
      const user =  JSON.parse((await checkUserByEmail(formData.email) as string)) as SignInUserFromDB
      
      if (!user.isExist) {
        toast.error("this email does not exist")
        setLoading("")
        return
      }
      
      await setUserId(user.user._id)
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      toast.success("signed in!")

      if (user.user.role == "customer") {
        router.push("/pharmacies")
      } else if (user.user.role == "pharmacist") {
        router.push(`/pharmacy/dashboard/${user.user._id}/drugs`)
      }
      setLoading("done")
    } catch (error) {
      toast.error("something unexpected happened, please try again")
      setLoading("")
    }
    form.reset()
    setPassword("")
   }

  return (
    <section className="">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <FormField
       control={form.control}
       name="email"
       render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-1">Email</FormLabel>
          <FormControl>
            <div className="pl-3 flex items-center border border-[#ccc] bg-input-bg rounded">
            <MdEmail fontSize={23} className="text-gray-500" />
            <Input
             className="border-0 placeholder:text-gray-1 "
             placeholder="johndoe@gmail.com"
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
         <div className=" placeholder:text-gray-1 outline-none pl-3 py-2
           rounded border border-[#ccc] flex  bg-input-bg">
          <MdOutlineKey fontSize={23} className="text-gray-500" />
          <input
           type="password"
           name="password"
           value={password}
           onChange={event => setPassword(event.target.value)}
           className="border-0 outline-0 bg-dark-400 ml-3 w-full  bg-input-bg"
          />
         </div>
        </div>

        <Button
         type="submit"
         className="bg-blue text-white w-full rounded hover:bg-blue
         active:bg-blue inactive:bg-blue cursor-pointer"
         disabled={loading === "loading"}
        >
          {loading === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
        {user && <p className="text-red-500 text-center">{user}</p>}
      </form>
      <p className="mt-3 text-gray-1">
       New here? <Link href="/accounts/sign-up"
       className="text-gray-1 underline">sign up</Link>
      </p>
     </Form>
    </section>
  )
}
