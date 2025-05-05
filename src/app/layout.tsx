import type { Metadata, Viewport } from "next";
import { Poppins, Raleway, Ubuntu } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "Sienna - Your Next Chapter",
  description: "A companion app for new graduates living on their own for the first time",
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.variable} ${raleway.variable} ${ubuntu.variable} font-sans bg-base-100 text-base-content`}>
        <div className="min-h-screen flex flex-col">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
