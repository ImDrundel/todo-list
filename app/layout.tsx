import type { Metadata } from "next"
import "./globals.scss"
import { Nunito_Sans } from "next/font/google"

export const metadata: Metadata = {
  title: "Todo list",
  description: "Todo list by Andrew",
}
const font = Nunito_Sans({
  weight: "400",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={font.className}>
      <body>{children}</body>
    </html>
  )
}
