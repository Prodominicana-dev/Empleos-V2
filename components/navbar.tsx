"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
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
import { usePathname } from "next/navigation";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, isLoading } = useUser();
  const pathname = usePathname();

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
      href: "/vacancy",
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
        {NAVBAR_OPTIONS.map(({ name, href }: NavbarOptions, index: number) => (
          <NavbarItem key={index}>
            <Link
              href={href}
              className={
                pathname === href
                  ? "transition duration-200 text-blue-950 border-b-1 border-red-600"
                  : "transition duration-200 text-blue-950 hover:border-b-1 hover:border-red-600"
              }
            >
              {name}
            </Link>
          </NavbarItem>
        ))}

        {!isLoading && user && (
          <NavbarItem>
            <Dropdown placement="bottom-start">
              {/* {users.image && users.image.startsWith("http") && !file && (
                <Avatar className="h-14 w-14" src={users?.image} />
              )}
              {file && (
                <Avatar className="h-14 w-14" src={URL.createObjectURL(file)} />
              )}
              {users.image && !users.image.startsWith("http") && !file && (
                <Avatar
                  className="h-14 w-14"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}/img/${user.image}`}
                />
              )} */}
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
                  <p className="font-bold">Logueado como</p>
                  <p className="font-bold">{user?.nickname}</p>
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  as={Link}
                  href={`/profile/${user.sub}`}
                >
                  Mi Perfíl
                </DropdownItem>
                <DropdownItem
                  key="applications"
                  as={Link}
                  href={`/applications/`}
                >
                  Mis aplicaciones
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  as={Link}
                  onClick={() => {
                    // Eliminar localeStorage de la sesion
                    localStorage.removeItem("user");
                    localStorage.removeItem("userId");
                  }}
                  href={`/api/auth/logout?returnTo=${process.env.NEXT_PUBLIC_BASE_URL}`}
                  color="danger"
                >
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}

        {!isLoading && !user && (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                href={`/api/auth/login?returnTo=${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`}
                className="transition duration-200 text-blue-950 hover:border-b-1 hover:border-red-600"
              >
                Inicia sesión
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                className="bg-blue-100 text-blue-950"
                href={`/api/auth/login?returnTo=${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`}
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
