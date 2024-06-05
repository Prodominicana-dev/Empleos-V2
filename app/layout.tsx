import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { ScrollShadow } from "@nextui-org/react";
import clsx from "clsx";
import Background from "@/components/background";
import NavbarComponent from "@/components/navbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <head />
      <body className={clsx("min-h-screen font-sans antialiased text-white")}>
        <UserProvider>
          <Providers>
            <div className="relative flex flex-col h-screen overflow-y-auto bg-white">
              <NavbarComponent />
              {/* <main className="container flex-grow px-6 pt-16 mx-auto max-w-7xl"> */}
              <main>{children}</main>
            </div>
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
