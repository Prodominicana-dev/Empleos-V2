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
  Button,
} from "@nextui-org/react";
import { LogoIcon } from "./icons";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import Image from "next/image";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, isLoading } = useUser();

  type NavbarOptions = {
    name: string;
    href: string;
  };

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

  const NAVBAR_OPTIONS = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Vacantes",
      href: "/",
    },
  ];

  return (
    <Navbar
      disableScrollHandler={true}
      height={"8rem"}
      isBlurred={false}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white"
      maxWidth="2xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href={"/"}>
            <Image
              src={"/empleate.svg"}
              alt="logo"
              width={1000}
              height={1000}
              className="w-64"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="flex items-center gap-10">
        {NAVBAR_OPTIONS.map(({ name, href }: NavbarOptions) => (
          <NavbarItem>
            <Link
              href={href}
              className="transition duration-200 text-blue-950 hover:border-b-1 hover:border-red-600"
            >
              {name}
            </Link>
          </NavbarItem>
        ))}

        {!isLoading && user && (
          <NavbarItem>
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: false,
                    src: user?.picture || "",
                  }}
                  className="text-black transition-transform"
                  description={user?.nickname}
                  name={user?.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="gap-2 h-14">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{user?.nickname}</p>
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  as={Link}
                  href={`/profile/${user.sub}`}
                >
                  Mi Perfíl
                </DropdownItem>
                <DropdownItem key="profile"></DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  as={Link}
                  href={`/api/auth/logout?returnTo=${process.env.NEXT_PUBLIC_BASE_URL}`}
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}

        {!isLoading && !user && (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                href="/api/auth/login"
                className="transition duration-200 text-blue-950 hover:border-b-1 hover:border-red-600"
              >
                Inicia sesión
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                className="bg-blue-100 text-blue-950"
                href="/api/auth/login"
                variant="flat"
              >
                Regístrate
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* <NavbarMenu>
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
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </Navbar>
  );
}
