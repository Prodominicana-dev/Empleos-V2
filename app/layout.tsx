import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { ScrollShadow } from "@nextui-org/react";
import clsx from "clsx";
import Background from "@/components/background";
import NavbarComponent from "@/components/navbar";

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
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flex flex-col h-screen overflow-y-auto">
            <ScrollShadow>
              <NavbarComponent />
              <main className="container flex-grow px-6 pt-16 mx-auto max-w-7xl">
                {children}
              </main>
            </ScrollShadow>
          </div>
          <Background />
        </Providers>
      </body>
    </html>
  );
}
