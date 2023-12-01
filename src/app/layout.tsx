import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import UserProvider from "@/components/UserProvider";
import NavUser from "@/components/NavUser";
import { cookies } from "next/headers";
import { type User } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TIN - s22502",
  description: "Final project TIN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userFromCookie = cookies().get("user")?.value;

  const user = userFromCookie ? (JSON.parse(userFromCookie) as User) : null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider initialUser={user}>
          <nav className="flex items-center gap-10 p-4 font-bold">
            <p>Barnaba Gańko - s22502</p>
            <Link href="/note" className="underline">
              Notes
            </Link>
            <Link href="/group" className="underline">
              Groups
            </Link>
            <Link href="/tag" className="underline">
              Tags
            </Link>
            <NavUser />
          </nav>
          <main className="p-4">{children}</main>
          <footer className="mt-10 p-4">Barnaba Gańko - s22502</footer>
        </UserProvider>
      </body>
    </html>
  );
}
