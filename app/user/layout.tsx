"use client";

import { SessionProvider } from "next-auth/react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <main>{children}</main>
    </SessionProvider>
  );
}
