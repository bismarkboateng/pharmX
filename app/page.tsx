"use client"

import Link from "next/link";
import Image from "next/image"
import { TypeAnimation } from "react-type-animation"



export default function Home() {
  return (
    <section className="px-10 py-5">
      <section className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={24}
            height={24}
            className="rounded-full"
          />
          <p className="font-bold">pharm X</p>
        </Link>
        <div>
         <Link
           href="/accounts/sign-in"
           className="bg-[#043CAA] transition-all duration-500 px-5 py-3 rounded cursor-pointer text-white">
            Sign in
          </Link>
        </div>
      </section>


      <section className="mt-10 mb-32">
        <h1 className="text-gray-800 text-lg leading-5 md:text-4xl w-full md:w-[80%] font-bold text-center
      mx-auto md:leading-[80px]">
          <TypeAnimation
            sequence={[
              'Revolutionizing', // Types 'One'
              1000, // Waits 1s
              'Revolutionizing Healthcare', // Deletes 'One' and types 'Two'
              1000, // Waits 2s
              'Revolutionizing Healthcare With',
              1000,
              'Revolutionizing Healthcare With Pharm X',
               // Types 'Three' without deleting 'Two'
              () => {
                console.log('Sequence completed');
              },
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: '2em', display: 'inline-block', lineHeight: "60px"}}
          />
        </h1>
        <p className="text-base w-full md:text-lg md:w-[70%] mx-auto text-gray-400 mb-8 text-center">
          Pharm X is a comprehensive pharmacy web application that streamlines your healthcare experience. Order
          drugs based on your prescription, find nearby pharmacies, and locate them on a map.
        </p>
      </section>

      <section>
        <h1 className="text-[#043CAA] text-center text-xl font-bold">Our Affiliations</h1>
        <div className="flex items-center justify-center gap-20 mt-10 ">
          <Image src="/assets/aff1.png" width={50} height={50} alt="aff1" />
          <Image src="/assets/aff2.png" width={50} height={50} alt="aff1" />
          <Image src="/assets/aff3.png" width={30} height={30} alt="aff1" />
        </div>
      </section>

      <section className="flex flex-col lg:flex-row items-center gap-20 mt-32">
        <section className="w-full lg:w-[50%]">
          <h2 className="text-2xl font-bold mb-4">Order Drugs Based on Prescription</h2>
          <p className="text-gray-500 mb-6">
            Easily order your medications based on your prescription.
            Our user-friendly platform makes it simple to manage your healthcare needs.
          </p>
          <Link
            href="/accounts/sign-in"
            className="bg-[#043CAA] hover:bg-blue active:bg-blue px-5 py-3
            rounded cursor-pointer text-white"
          >
            Order now
          </Link>
        </section>
        <section className="w-full lg:w-[50%]">
          <Image
            src="/assets/prescription-file-1.png"
            alt="prescription file"
            width={500}
            height={200}
            className="object-cover hover:scale-105 transition-all duration-500
        rounded"
          />
        </section>
      </section>

      <section className="w-full flex flex-col lg:flex-row items-center gap-20 md:mt-20 lg:mt-32">
        <section className="w-full lg:w-[50%]">
          <Image
            src="/assets/pharmacy-finder1.png"
            alt="pharmacy finder"
            width={500}
            height={200}
            className="object-cover hover:scale-105 transition-all duration-500
        rounded"
          />
        </section>
        <section className="w-full lg:w-[50%]">
          <h2 className="text-2xl font-bold mb-4">Pharmacy Finder</h2>
          <p className="text-gray-500 mb-6">
            Easily locate the nearest pharmacy to your location. Our comprehensive directory ensures you can
            access the healthcare services you need.
          </p>
          <Link
            href="/accounts/sign-in"
            className="bg-[#043CAA] hover:bg-blue active:bg-blue px-5 py-3
            rounded cursor-pointer text-white"
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
