import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MainNav } from "@/components/main-nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Herring's Portfolio",
  description: "A portfolio showcasing my journey in AI and human intelligence research",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <MainNav />
              </div>
            </header>
            <main className="flex-1 container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
