import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toat-provider";
import Head from "next/head";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QualityShop",
  description: "Tienda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        <Head>
            <link rel='icon' href='/favicon.ico' />
        </Head>
        {children}
        <Footer />
      </body>
    </html>
  );
}
