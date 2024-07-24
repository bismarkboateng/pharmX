import Link from "next/link";
import Image from "next/image"


export default function Home() {
  return (
    <section className="px-10 py-5">
     <section className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
       <Image
        src="/assets/icons/logo-full.png"
        alt="logo"
        width={24}
        height={24}
        className="rounded-full"
       />
       <p className="text-white font-bold">Pharm X</p>
      </Link>
      <div>
       <Link href="/accounts/sign-in" className="bg-blue-600 hover:bg-blue-500 transition-all duration-500 
       active:bg-blue-600 px-5 py-3 rounded cursor-pointer">
        Order drug
       </Link>
      </div>
     </section>

     <section className="mt-10 mb-32">
      <h1 className="text-6xl w-[80%] font-bold text-center
      mx-auto leading-[80px]">
        Revolutionizing Healthcare With Pharm X
      </h1>
      <p className="text-lg w-[70%] mx-auto text-gray-400 mb-8 text-center">
        Pharm X is a comprehensive pharmacy web application that streamlines your healthcare experience. Order
        drugs based on your prescription, find nearby pharmacies, and locate them on a map.
      </p>
     </section>

     <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
      <section>
       <h2 className="text-2xl font-bold mb-4">Order Drugs Based on Prescription</h2>
       <p className="text-gray-400 mb-6">
        Easily order your medications based on your prescription.
        Our user-friendly platform makes it simple to manage your healthcare needs.
       </p>
       <Link
        href="/accounts/sign-in"
        className="bg-blue-600 hover:bg-blue-500 active:bg-blue-600
        px-5 py-3 rounded cursor-pointer"
       >
        Order now
       </Link>
      </section>
      <section>
        Prescription image here
      </section>
     </section>
     
     <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-32">
      <section>
       google map here
      </section>
      <section>
       <h2 className="text-2xl font-bold mb-4">Pharmacy Finder</h2>
       <p className="text-gray-400 mb-6">
        Easily locate the nearest pharmacy to your location. Our comprehensive directory ensures you can
        access the healthcare services you need.
       </p>
       <Link
        href="/accounts/sign-in"
        className="bg-blue-600 hover:bg-blue-500 active:bg-blue-600
        px-5 py-3 rounded cursor-pointer"
       >
        Find a pharmacy
       </Link>
      </section>
     </section>
     <footer className="mt-32 text-gray-600 italic px-4 md:px-6">
      <div className="">
        <p className="text-sm text-center">&copy; 2024 Pharm X. All rights reserved.</p>
      </div>
      </footer>
    </section>
  )
}
