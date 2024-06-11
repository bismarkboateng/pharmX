
export default function PharmacyDetail({ params }: { params: { pharmacyName: string}}) {

    return (
    <section>
      {params.pharmacyName} pharmacy details and drug inventory to search for
      available drugs
    </section>
  )
}
