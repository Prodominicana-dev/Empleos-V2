"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { LogoIcon } from "./icons";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      disableScrollHandler={true}
      height={"5rem"}
      isBlurred={true}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/40"
      maxWidth="lg"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <LogoIcon size={48} />
        <NavbarBrand>
          <h1 className="font-bold text-[#00A9E0] text-xl">
            Pro<span className="text-blue-950">Dominicana</span>
          </h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-blue-950">
            Inicia sesión
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            className="bg-blue-100 text-blue-950"
            href="#"
            variant="flat"
          >
            Regístrate
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
