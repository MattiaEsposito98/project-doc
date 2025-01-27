import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Details() {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)

  function fetchDoctor() {
    axios.get(`${import.meta.env.VITE_API_URL}/${id}`)
      .then(response => {
        setDoctor(response.data)
      })
      .catch((err) => {
        console.error("Errore nel recupero dati", err);
      })
  }

  useEffect(() => {
    fetchDoctor()
  }, [id])

  if (!doctor) return <p>Nessun dettaglio trovato per questo medico.</p>;

  return (
    <>
      <div>
        <h1>{doctor.Nome}</h1>
      </div>
    </>
  )
}