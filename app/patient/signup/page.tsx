"use client"

import { useForm } from "@mantine/form";
import { PasswordInput, TextInput, Group, Stack, Button, Box } from "@mantine/core";
import { patientFormInitialValues } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { auth } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { createPatient } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [loading, setLoading] = useState("")
  const router = useRouter()

  const form = useForm({
    mode: "uncontrolled",
    initialValues: patientFormInitialValues,

    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      address: (value) => (value === "" ? "Address field cannot be empty" : null),
      contact: (value) => (value === "" ? "Address field cannot be empty" : null),
      location: (value) => (value === "" ? "Address field cannot be empty" : null),
      password: (value) => (value.length < 6 ? "Password must have at least 6 letters" : null),
      confirmPassword: (value, values) => (value !== values.password ? "Passwords do not match" : null),
    },
  });

  const handleSubmit = async (values: typeof patientFormInitialValues) => {
    try {
      setLoading("loading")
      const { user } =await createUserWithEmailAndPassword(auth, values.email, values.password)
      const patient = {
        name: values.name,
        email: values.email,
        address: values.address,
        contact: values.contact,
        location: values.location,
        authId: user.uid
      }
      await createPatient(patient)
      setLoading("done")
      router.push("/patient/signin")
    } catch (error) {
      setLoading("error")
    }
  }


  return (
    <section className="flex flex-col w-[95%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto mt-20">
      <h1 className="text-xl text-[#343a40] font-medium text-center">Create An Account</h1>
      <section className="mt-3">
       <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Full Name"
          placeholder="type your name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <TextInput
          mt="sm"
          label="Email"
          placeholder="your email"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <TextInput
          mt="sm"
          label="Address"
          placeholder="your address"
          key={form.key("address")}
          {...form.getInputProps("address")}
        />

        <TextInput
          mt="sm"
          label="Contact"
          placeholder="your contact"
          key={form.key("contact")}
          {...form.getInputProps("contact")}
        />

        <TextInput
          mt="sm"
          label="Location"
          placeholder="your location"
          key={form.key("location")}
          {...form.getInputProps("location")}
        />

        <PasswordInput
          mt="sm"
          label="Password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <PasswordInput
          mt="sm"
          label="Confirm Password"
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
        />
        <Group justify="flex-start" mt="md">
          <Button type="submit" loading={loading === "loading"} fullWidth>Create</Button>
        </Group>
       </form>
      </section>
      <p className="text-center mt-3 text-gray-500">Already have an account?
        <Link href="/patient/signin" className="text-[#0d6efd] ml-1 underline cursor-pointer">Login</Link>
      </p>
      {loading === "error" && <p className="text-red-500">Something went wrong! Please try again</p>}
    </section>
  )
}
