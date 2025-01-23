import { Outlet } from "react-router-dom"
import Header from "../Pages/Header"
import Footer from "../Pages/Footer"

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}