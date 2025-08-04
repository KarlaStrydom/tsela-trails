"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useHome } from "@/context/home"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ContactForm } from "./contact-form"
import slugify from "slugify";

export function NavBar() {
  const home = useHome()
  return (
    <div className="flex items-center justify-between w-full font-heading font-extrabold text-2xl py-4">
      <div>
        <Link href="/"><Image src="/Emblem Logo/Emblem Brown.svg" alt="Logo" width={100} height={100}/></Link>
      </div>
      <NavigationMenu className="w-full flex items-center justify-between">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Info</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {home?.layout?.map((block: any) => {
                  if (block.blockType === 'featureList') {
                    return block.features
                      ?.filter((feature: any) => feature.visible)
                      .map((feature: any) => (
                        <li key={feature.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={feature.url || '/info/' + slugify(feature.title, { lower: true })}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{feature.title}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))
                  }
                  return null
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/blog">Blog</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <ContactForm buttonText="Contact" />
    </div>
  )
}
