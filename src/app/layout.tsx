import "./globals.scss";

import type { Metadata } from "next";
import { headers } from "next/headers";

import { DeviceProvider } from "./components/DeviceProvider";

export const metadata: Metadata = {
  title: "캣갱",
  description: "내 주먹이 운다",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  return (
    <html lang="ko">
      <DeviceProvider isMobile={isMobile}>
        <body>{children}</body>
      </DeviceProvider>
    </html>
  );
}
