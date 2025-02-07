import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {
  const [doctors, setDoctors] = useState([])
  const [search, setSearch] = useState('')

  function fetchDoctors() {
    axios.get(`${import.meta.env.VITE_API_URL}`)
      .then((res) => {
        setDoctors(res.data)
      })
      .catch((err) => {
        console.error(err);
      })

  }

  //Hook per caricare i dottori all'inizio
  useEffect(() => {
    fetchDoctors()
  }, [])


  return (
    <GlobalContext.Provider value={{ doctors, setDoctors, search, setSearch, fetchDoctors }}>
      {children}
    </GlobalContext.Provider>
  )

}