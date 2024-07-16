import Link from "next/link";


export default function Home() {
  return (
    <section>
      <section className="min-h-screen items-center justify-center
      flex flex-col">
       <h1 className="font-bold">Welcome to pharm X</h1>
       <Link href="/accounts/sign-in" className="text-blue-500 underline">
        sign in
       </Link>
      </section>
    </section>
  )
}
