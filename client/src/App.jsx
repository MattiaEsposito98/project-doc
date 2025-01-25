import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import GlobalProvider from "./context/Globalcontext"
import HomePage from "./Pages/HomePage"
import About from "./Pages/About"
import Contact from "./Pages/Contact"

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>



    </>
  )
}

export default App
