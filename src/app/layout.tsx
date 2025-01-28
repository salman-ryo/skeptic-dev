import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "prismjs/themes/prism-tomorrow.css";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/layout/footer";
import ScrollProgress from "@/components/animation/ScrollProgress";

const roboto = Roboto({
  subsets: ["latin", "greek", "cyrillic"],
  weight: ["700", "500", "400", "300", "100"],
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} no-scrollbar`}>
        <ScrollProgress/>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="fixed bottom-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <Header />
            <main>{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
