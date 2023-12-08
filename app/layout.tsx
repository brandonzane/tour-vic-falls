import Navbar from "@/app/components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/modals/SearchModal";
import { SpeedInsights } from "@vercel/speed-insights/next";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Tour Victoria Falls",
  description: "Tour Victoria Falls",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <SpeedInsights />
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
