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
  title: "Ismail Oni | Frontend Developer",
  description: "Portfolio of Ismail Oni — frontend engineer crafting modern, high-converting web products.",
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
