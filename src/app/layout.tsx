import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import "prismjs/themes/prism-tomorrow.css";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({subsets:["latin","greek","cyrillic"], weight:["400","100","700"]})

export const metadata: Metadata = {
  title: "Skeptic Dev",
  description: "Your go to blog for tech solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
