import {JetBrains_Mono} from 'next/font/google';
import "./globals.css";
import Header from "../components/Header";
import PageTransition from "@/components/PageTransition";

const jetBrains_Mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jebrains_Mono',

});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ismailoni.vercel.app"),
  title: {
    default: "Ismail Oni | Full-Stack Engineer",
    template: "%s | Ismail Oni",
  },
  description:
    "Portfolio of Ismail Oni — product-focused full-stack engineer building fast, scalable, high-converting web applications.",
  applicationName: "Ismail Oni Portfolio",
  keywords: [
    "Ismail Oni",
    "Full-Stack Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer",
    "React Developer",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Ismail Oni" }],
  creator: "Ismail Oni",
  publisher: "Ismail Oni",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Ismail Oni Portfolio",
    title: "Ismail Oni | Full-Stack Engineer",
    description:
      "Explore projects, services, and experience from Ismail Oni, a product-focused full-stack engineer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ismail Oni | Full-Stack Engineer",
    description:
      "Explore projects, services, and experience from Ismail Oni, a product-focused full-stack engineer.",
    creator: "@IsmailOni3",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={jetBrains_Mono.variable}
      >
        <div className="relative min-h-screen">
          <Header />
          <PageTransition>
            <main className="pt-8 pb-14 md:pt-12 md:pb-20">{children}</main>
          </PageTransition>
        </div>
      </body>
    </html>
  );
}
