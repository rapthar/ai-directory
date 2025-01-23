import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "AI Agency Directory | Find Agencies and Teams to build great ideas together",
  description: "Find agencies and teams to build your MVP or SaaS projects using Ai technology and human genius",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
