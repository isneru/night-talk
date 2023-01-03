import { Sidebar } from "components"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex max-h-screen flex-1 gap-px">
      <Sidebar />
      <main className="h-screen flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
