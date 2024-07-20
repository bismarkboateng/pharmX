"use client"

import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"


type PharamcyDashboardParams = {
  params: {
    pharmacyId: string;
  }
}

export default function PharmacyDashboard({ params: { pharmacyId } }: PharamcyDashboardParams) {

  const data = [
    { name: '12/23/2023', uv: 400 },
    { name: '13/23/2023', uv: 500 },
    { name: '14/23/2023', uv: 700 },
    { name: '15/23/2023', uv: 800 },
    { name: '16/23/2023', uv: 300 },
    { name: '17/23/2023', uv: 600 },
  ]

  // TODO: fetch the orders from the db and render it here

  return (
    <section className="pr-2">
      <section className="mt-6">
        <h1 className="ml-8 font-bold">All Orders</h1>
        <section className="mt-5 w-full h-[50vh] p-0">
          <ResponsiveContainer width={"100%"}>
           <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#040475" />
            <XAxis dataKey="name" />
            <YAxis />
           </LineChart>
          </ResponsiveContainer>
        </section>
      </section>
    </section>
  )
}
