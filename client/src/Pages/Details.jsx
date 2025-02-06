import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./Details.module.css";
import Stars from "../components/Stars";
import FormReview from "../components/FormReview";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [showForm, setshowForm] = useState(false)

  function fetchDoctor() {
    axios.get(`${import.meta.env.VITE_API_URL}/${id}`)
      .then(response => {
        setDoctor(response.data);
      })
      .catch((err) => {
        console.error("Errore nel recupero dati", err);
      });
  }

  useEffect(() => {
    fetchDoctor();
  }, []);

  if (!doctor) return <p>Nessun dettaglio trovato per questo medico.</p>;

  return (
    <>
      <button className="buttonNavigate" onClick={() => navigate(-1)}>Torna indietro</button>
      <div className="container">
        <h1>Dott.{doctor.Nome} {doctor.Cognome}</h1>
        <ul className={style.ulDetails}>
          <li><strong>Email:</strong> {doctor.Email}</li>
          <li><strong>Specializzazione:</strong> {doctor.Specializzazione}</li>
          <li><strong>Indirizzo:</strong> {doctor.Indirizzo}</li>
          <li><strong>Numero di telefono:</strong> {doctor.Telefono}</li>
          {doctor.valutazione && <li><strong>Valutazione:</strong> {<Stars valutazione={doctor.Valutazione} />} </li>}
        </ul>
      </div>

      {/* Recensioni */}
      <div className="container">
        <h1 className={style.titleRecensioni}>Recensioni</h1>
        <div className="row">
          <div className="col-50">
            {doctor.paziente_medico && doctor.paziente_medico.length > 0 ? (
              <ul>
                {doctor.paziente_medico.map((recensione, i) => (
                  <li className={style.liCard} key={i}>
                    <h2>{recensione.name}</h2>
                    <strong>Valutazione:</strong> {<Stars valutazione={recensione.Valutazione} />} <br />
                    <p><strong>Commento:</strong> {recensione.Descrizione}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nessuna recensione disponibile</p>
            )}
          </div>
          <div className="col-50">
            <button className="buttonReviews" onClick={() => setshowForm(!showForm)}><span> {showForm ? '-' : '+'} </span> Aggiungi una recensione</button>
            {showForm && <FormReview onReviewSubmitted={fetchDoctor} />}

          </div>
        </div>
      </div>




    </>
  );
}
