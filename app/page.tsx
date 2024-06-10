"use client"
import { Radio, Stack, Button} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [option, setOption] = useState("")
  const router = useRouter()

  const route = () => {
    router.push(option === "patient" ? "/patient" : "/pharmacist")
  }

  return (
    <div>
     <section className="flex min-h-screen flex-col items-center justify-center">
      <Radio.Group
       name="description"
       label="Which best describes you?"
       value={option}
       onChange={setOption}
      >
       <Stack mt="xs">
        <Radio value="patient" label="I want to buy a drug" />
        <Radio value="pharmacist" label="I'm a pharmacist" />
        <Button variant="filled" fullWidth className="cursor-pointer"
         onClick={route}>
          Continue
        </Button>
       </Stack>
      </Radio.Group>
     </section>
    </div>
  ) 
}
