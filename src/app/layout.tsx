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
