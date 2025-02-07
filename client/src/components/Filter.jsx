import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import style from "./Filter.module.css";

export default function Filter() {
  const { setDoctors, setFilters } = useContext(GlobalContext);
  const [search, setSearch] = useState({
    Nome: '',
    Cognome: '',
    Specializzazione: ''
  });

  function filterDoctors() {
    axios.get(`${import.meta.env.VITE_API_URL}search`, {
      params: {
        Nome: search.Nome,
        Cognome: search.Cognome,
        Specializzazione: search.Specializzazione
      }
    })
      .then(res => {
        setDoctors(res.data);
        // Reset dei campi di ricerca
        setSearch({
          Nome: '',
          Cognome: '',
          Specializzazione: ''
        });
      })
      .catch(err => {
        console.error(err, 'Errore nella ricerca del medico');
      });
  }

  function searchDoctors(e) {
    e.preventDefault();
    setFilters(search); // Imposta i filtri
    filterDoctors(); // Esegui la ricerca
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  }

  return (
    <form className={style.formPosition} onSubmit={searchDoctors}>
      <h5 className={style.formTitle}>Cerca un dottore</h5>
      <div className={style.formFilter}>
        <input
          type="text"
          name="Nome"
          value={search.Nome}
          onChange={handleChange}
          placeholder="Nome"
          className={style.inputField} // Aggiunta classe per gli input
        />
        <input
          type="text"
          name="Cognome"
          value={search.Cognome}
          onChange={handleChange}
          placeholder="Cognome"
          className={style.inputField} // Aggiunta classe per gli input
        />
        <input
          type="text"
          name="Specializzazione"
          value={search.Specializzazione}
          onChange={handleChange}
          placeholder="Specializzazione"
          className={style.inputField} // Aggiunta classe per gli input
        />
      </div>

      <div className={style.buttonFilter}>
        <button type="submit" className={style.submitButton}>Cerca</button> {/* Aggiunta classe per il bottone */}
      </div>
    </form>
  );
}
