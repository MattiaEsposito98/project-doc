import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import style from "./Details.module.css"
import Stars from "../components/Stars"

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
      <div className="container">
        <h1>Dott.{doctor.Nome} {doctor.Cognome}</h1>
        <ul className={style.ulDetails}>
          <li><strong>Email:</strong> {doctor.Email}</li>
          <li><strong>Specializzazione:</strong> {doctor.Specializzazione}</li>
          <li><strong>Indirizzo:</strong> {doctor.Indirizzo}</li>
          <li><strong>Numero di telefono:</strong> {doctor.Telefono}</li>
          <li><strong>Valutazione:</strong> {<Stars valutazione={doctor.Valutazione} />} </li>
        </ul>
      </div>

      {/* Recensioni */}
      <div className="container"></div>
      <h1>Recensioni</h1>

      {doctor.paziente_medico && doctor.paziente_medico.length > 0 ? (
        <ul>
          {doctor.paziente_medico.map((recensione, i) => (
            <li className={style.liCard} key={i}>
              <h2>{recensione.name}</h2>
              <strong>Valutazione:</strong> {<Stars valutazione={recensione.Valutazione} />} <br />
              <strong>Commento:</strong> {recensione.Descrizione}
            </li>
          ))}
        </ul>
      ) : (<p>Nessuna recensione disponibile</p>
      )}

    </>
  )
}