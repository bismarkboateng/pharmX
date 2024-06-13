"use client"

import { fetchPharmacyDrugs } from "@/lib/actions/pharmacy.actions"
import { Card, Text, Badge, Button, Group, TextInput } from '@mantine/core';
import Image from "next/image"
import Link from "next/link"
import { useState, FormEvent, useEffect } from "react"


export default function Drugs({ params }: { params: { pharmacyId: string}}) {
  const [search, setSearch] = useState("")
  const [drugs, setDrugs] = useState<DrugType[] | null >(null)
  
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // call a server action to search through the database
    console.log(search)
    setSearch("")
  }

  useEffect(() => {
    const fetchDrugs = async () => {
      const drugs = await fetchPharmacyDrugs(params.pharmacyId)
      setDrugs(JSON.parse(drugs))
    }

    fetchDrugs()
  }, [params.pharmacyId])


  return (
    <section>
     <section className="px-3">
      <h1 className="capitalize text-center text-lg mt-3 font-medium">
       Welcome to the ... pharmacy.
      </h1>
      <form onSubmit={handleSearch}>
       <TextInput value={search} onChange={event => setSearch(event.target.value)} placeholder="Search for a drug" className="mt-3" />
       <button type="submit" hidden></button>
      </form>
     </section>

     <section>
      <h3 className="mt-3 text-gray-500 text-center">Available Drugs</h3>
      <div className="px-3 grid grid-cols-1 gap-2">
       {drugs?.map((drug: DrugType) => (
        <Card key={drug._id} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Link href={`/drugs/${drug._id}/detail`}>
             <Image
              src={drug.image}
              width={160}
              height={160}
              alt="drug"
              className="w-full h-full object-cover"
             />
            </Link>
          </Card.Section>
    
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{drug.name}</Text>
            <Badge color="pink">On Sale</Badge>
          </Group>
    
          <Text size="sm" c="dimmed">
            {drug.description}
          </Text>
    
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>GHC {drug.price}</Text>
          </Group>
        </Card>
       ))}
      </div>
     </section>

    </section>
  )
}