import { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "prismjs/themes/prism-tomorrow.css";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/layout/footer";
import ScrollProgress from "@/components/animation/ScrollProgress";
import UserSessionProvider from "@/components/UserSessionProvider";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";
import { getBaseUrl } from "@/utils/getBaseUrl";

const roboto = Roboto({
  subsets: ["latin", "greek", "cyrillic"],
  weight: ["700", "500", "400", "300", "100"],
});

const SITE_DATA = {
  title: "The Skeptic Dev | Micro Blogging for Full Stack Developers",
  description:
    "The Skeptic Dev is a micro blogging platform for full stack software development enthusiasts, offering expert insights, tutorials, and a vibrant tech community.",
};

export const metadata: Metadata = {
  title: SITE_DATA.title,
  description: SITE_DATA.description,
  metadataBase: new URL(getBaseUrl() as string), // Replace with your actual domain
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    url: getBaseUrl(), // Replace with your actual URL or use a helper if available
    title: SITE_DATA.title,
    description: SITE_DATA.description,
    siteName: SITE_DATA.title,
    // Uncomment and set your Facebook App ID if needed:
    // fb: {
    //   app_id: "YOUR_FACEBOOK_APP_ID",
    // },
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DATA.title,
    description: SITE_DATA.description,
  },

   // Add additional SEO fields
   keywords: ["web development", "full stack", "software engineering", "blogging platform"],
   category: "technology",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} no-scrollbar light:bg-cGray-dark dark:bgSpaceGradient`}
      >
        <UserSessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ScrollProgress />
            <TooltipProvider>
              <div className="fixed bottom-4 right-4 z-50">
                <ThemeToggle />
              </div>
              <Header />
              <main>{children}</main>
              <Toaster />
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </UserSessionProvider>
      </body>
    </html>
  );
}
