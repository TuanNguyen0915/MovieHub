"use client"
import Footer from "@/components/shared/footer/Footer"
import Header from "@/components/shared/header/Header"

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="flexCol min-h-screen gap-4">
      <Header />
      <section className="w-full flex-1 max-xl:px-4">{children}</section>
      <Footer />
    </main>
  )
}

export default RootLayout
