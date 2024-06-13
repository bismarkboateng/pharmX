"use client"

import { TextInput } from "@mantine/core"
import { useState, FormEvent } from "react"

export default function Drugs({ params }: { params: { pharmacyName: string}}) {
 const [search, setSearch] = useState("")

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // call a server action to search through the database
    console.log(search)
    setSearch("")
  }

  return (
    <section>
     <section className="px-3">
      <h1 className="capitalize text-center text-lg mt-3 font-medium">
       Welcome to the {params.pharmacyName} pharmacy.
      </h1>
      <form onSubmit={handleSearch}>
       <TextInput value={search} onChange={event => setSearch(event.target.value)} placeholder="Search for a drug" className="mt-3" />
       <button type="submit" hidden></button>
      </form>
     </section>

     <section>
      <h3 className="mt-3 text-gray-500 text-center">Available Drugs</h3>
      <div>
        
      </div>
     </section>

    </section>
  )
}