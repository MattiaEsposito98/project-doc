import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import GlobalProvider from "./context/GlobalContext"
import HomePage from "./Pages/HomePage"
import About from "./Pages/About"
import Details from "./Pages/Details"
import Register from "./Pages/Register"

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<About />} />
              <Route path="register" element={<Register />} />
              <Route path="Details/:id" element={<Details />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>



    </>
  )
}

export default App
