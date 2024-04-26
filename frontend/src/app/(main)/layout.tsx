import { RedirectUser } from "@/components"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main>{children}</main>
}
