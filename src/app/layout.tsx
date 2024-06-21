import "./globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { ScrollShadow } from "@nextui-org/react";
import Background from "@/components/background";
import NavbarComponent from "@/components/navbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Empleos ProDominicana",
  description:
    "Una plataforma para encontrar y ofrecer oportunidades laborales en República Dominicana",
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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen font-sans antialiased text-black">
        <UserProvider>
          <Providers>
            <div className="relative flex flex-col h-screen overflow-y-auto bg-white">
              <NavbarComponent />
              {/* <main className="container flex-grow px-6 pt-16 mx-auto max-w-7xl"> */}
              {children}
            </div>
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
