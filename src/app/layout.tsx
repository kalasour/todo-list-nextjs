import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import { Providers } from "@/store/provider";
import Loading from "./components/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="relative flex justify-center items-center min-h-screen">
            <div className="bg-white w-full max-w-[450px] p-8 flex justify-center border border-slate-400">
              <div className="divide-y-2 divide-dashed flex flex-col w-full">
                <Header />
                <div>{children}</div>
              </div>
            </div>
          </div>
          <Loading />
        </Providers>
      </body>
    </html>
  );
}
