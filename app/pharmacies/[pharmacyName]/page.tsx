import Image from "next/image"
import { Spoiler } from '@mantine/core';

export default function PharmacyDetail({ params }: { params: { pharmacyName: string}}) {

    return (
    <section>
      <h1 className="capitalize text-center text-lg mt-3 font-medium">
       Welcome to the {params.pharmacyName} pharmacy.
      </h1>
      <section className="mt-2 px-2">
       <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK40UOYGT_YvG4IwITTncR6sdU_q35x7S1zA&s"
        alt="kingdom shop"
        width={300}
        height={300}
        className="w-full h-full rounded"
       />
       <Spoiler className="mt-2" maxHeight={120} showLabel="Show more" hideLabel="Hide" transitionDuration={0}>
        We Butter the Bread with Butter was founded in 2007 by Marcel Neumann,
        who was originally guitarist for Martin Kesici&apos;s band, and Tobias Schultka.
        The band was originally meant as a joke, but progressed into being a more serious musical duo.
        The name for the band has no particular meaning, although its origins were suggested
        from when the two original members were driving in a car operated by Marcel Neumann
        and an accident almost occurred. Neumann found Schultka so funny that he briefly lost
        control of the vehicle Many of their songs from this point were covers of German folk tales and nursery rhymes.
       </Spoiler>
      </section>
    </section>
  )
}