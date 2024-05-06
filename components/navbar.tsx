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

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, isLoading } = useUser();

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

      {!isLoading && user && (
        <NavbarContent justify="end">
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
        </NavbarContent>
      )}

      {!isLoading && !user && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/api/auth/login" className="text-blue-950">
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
        </NavbarContent>
      )}
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
