import type { Metadata } from "next";
import { type LayoutProps } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "AI Agency Directory | Find Agencies and Teams to build great ideas together",
  description: "Find agencies and teams to build your MVP or SaaS projects using Ai technology and human genius",
};

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
