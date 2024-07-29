"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const ecommerceItems = [
  {
    title: "Product Categories",
    href: "/categories",
    description:
      "Explore various product categories to find what you need.",
  },
  {
    title: "Best Sellers",
    href: "/best-sellers",
    description:
      "Check out the most popular products among our customers.",
  },
  {
    title: "New Arrivals",
    href: "/new-arrivals",
    description:
      "Discover the latest products added to our store.",
  },
  {
    title: "Sales & Offers",
    href: "/sales",
    description:
      "Find the best deals and exclusive discounts.",
  },
  {
    title: "Customer Reviews",
    href: "/reviews",
    description:
      "Read feedback from other customers about our products.",
  },
]

const customerServiceItems = [
  {
    title: "FAQ",
    href: "/faq",
    description:
      "Find answers to frequently asked questions about our products and services.",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    description:
      "Get in touch with our customer support for assistance.",
  },
  {
    title: "Return Policy",
    href: "/return-policy",
    description:
      "Learn about our return and exchange policies to shop with confidence.",
  },
  {
    title: "Shipping Information",
    href: "/shipping",
    description:
      "Get details about our shipping policies and delivery options.",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    description:
      "Read our privacy policy to understand how we handle your data.",
  },
  {
    title: "Order Tracking",
    href: "/order-tracking",
    description:
      "Track your orders and view their status.",
  },
  {
    title: "Live Chat Support",
    href: "/live-chat",
    description:
      "Chat with our support team in real-time for immediate assistance.",
  },
]

const categories = [
  {
    title: "Electronics",
    href: "/categories/electronics",
  },
  {
    title: "Fashion",
    href: "/categories/fashion",
  },
  {
    title: "Home & Kitchen",
    href: "/categories/home-kitchen",
  },
  {
    title: "Beauty & Health",
    href: "/categories/beauty-health",
  },
  {
    title: "Sports & Outdoors",
    href: "/categories/sports-outdoors",
  },
]

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/home" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Welcome to Our Store
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Explore a wide range of products, find great deals, and enjoy a seamless shopping experience.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {ecommerceItems.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {categories.map((category) => (
                <ListItem
                  key={category.title}
                  title={category.title}
                  href={category.href}
                >
                  Browse our {category.title} collection.
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Customer Service</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {customerServiceItems.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>     
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
