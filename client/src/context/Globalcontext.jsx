import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {
  const [doctors, setDoctors] = useState([])
  const [search, setSearch] = useState('')


  function fetchDoctors() {
    axios.get(`${import.meta.env.VITE_API_URL}`, {
      params: {
        search: search
      }
    })
      .then((res) => {
        setDoctors(res.data)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // Per cercare un dottore
  function searchDoctor(e) {
    e.preventDefault()
    fetchDoctors()
    setSearch('')
  }

  useEffect(() => {
    fetchDoctors
  }, [])

  return (
    <GlobalContext.Provider value={{ doctors, setDoctors, search, setSearch, searchDoctor }}>
      {children}
    </GlobalContext.Provider>
  )

}