"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavBar() {
  return (
    <div className="flex items-center justify-between w-full font-heading font-extrabold text-2xl py-4">
      <div>
        <Link href="/">Logo</Link>
      </div>
      <NavigationMenu className="w-full flex items-center justify-between">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/info">Info</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/blog">Blog</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <Link href="/contact">Contact</Link>
      </div>
    </div>
  )
}
