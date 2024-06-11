"use client"

import { PiShoppingCartLight } from "react-icons/pi";
import { useDisclosure } from '@mantine/hooks';
import { Burger, Drawer } from '@mantine/core';
export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);


  return (
    <nav className="sticky top-0 left-0 w-full flex flex-col py-4 px-2 bg-white z-50 border-b">
      <section className="flex items-center justify-between">
       <Burger opened={opened} onClick={toggle} aria-label="toggle sidebar" />
       <h1>pharmX</h1>
       <PiShoppingCartLight fontSize={30} className="text-[#343a40]" />
      </section>

      <section>
       <Drawer
        opened={opened}
        onClose={close}
        title="sidebar contents"
        size="70%"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
       >
        {/* Drawer content */}
       </Drawer>
      </section>
    </nav>
  )
}
