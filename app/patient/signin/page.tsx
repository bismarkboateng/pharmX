"use client"

import { useForm } from "@mantine/form";
import { PasswordInput, TextInput, Group, Button } from "@mantine/core";
import { patientSigninFormIntialValues } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { checkPatient, setPatientId } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [loading, setLoading] = useState("")
  const router = useRouter()

  const form = useForm({
    mode: "uncontrolled",
    initialValues: patientSigninFormIntialValues,

    validate: {
      email: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      password: (value) => (value.length < 6 ? "Password must have at least 6 letters" : null),
    },
  });

  const handleSubmit = async (values: typeof patientSigninFormIntialValues) => {
    try {
      setLoading("loading")
      const exists = await checkPatient(values.email)
      // check if user exists
      if (!JSON.parse(exists).patientExist) {
        router.push("/patient/signup")
      } 
      const { user } = await signInWithEmailAndPassword(auth, values.email, values.password)
      // set cookie for protection of route
      setPatientId(user.uid)
      setLoading("done")
      router.push("/pharmacies")
    } catch (error) {
      setLoading("error")
    }
  }


  return (
    <section className="flex flex-col w-[95%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto mt-20">
      <h1 className="text-xl text-[#343a40] font-medium text-center">Sign in</h1>
      <section className="mt-3">
       <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          mt="sm"
          label="Email"
          placeholder="your email"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <PasswordInput
          mt="sm"
          label="Password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Group justify="flex-start" mt="md">
          <Button type="submit" loading={loading === "loading"} fullWidth>Sign in</Button>
        </Group>
       </form>
      </section>
      <p className="text-center mt-3 text-gray-500">New here?
        <Link href="/patient/signup" className="text-[#0d6efd] ml-1 underline cursor-pointer">Sign up</Link>
      </p>
      {loading === "error" && <p className="text-red-500">Something went wrong! Please try again</p>}
    </section>
  )
}
