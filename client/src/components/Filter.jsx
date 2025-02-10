import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import style from "./Filter.module.css";

export default function Filter() {
  const { setDoctors, setFilters, filters } = useContext(GlobalContext);
  const [search, setSearch] = useState({
    Nome: '',
    Cognome: '',
    Specializzazione: ''
  });

  function filterDoctors() {
    axios.get(`${import.meta.env.VITE_API_URL}search`, {
      params: filters
    })
      .then(res => {
        setDoctors(res.data);
      })
      .catch(err => {
        console.error(err, 'Errore nella ricerca del medico');
      });
  }

  function searchDoctors(e) {
    e.preventDefault();
    setFilters(search); // Imposta i filtri
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  }

  useEffect(() => {
    if (filters.Nome || filters.Cognome || filters.Specializzazione) {
      filterDoctors();
    }
  }, [filters]);

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
          className={style.inputField}
        />
        <input
          type="text"
          name="Cognome"
          value={search.Cognome}
          onChange={handleChange}
          placeholder="Cognome"
          className={style.inputField}
        />
        <input
          type="text"
          name="Specializzazione"
          value={search.Specializzazione}
          onChange={handleChange}
          placeholder="Specializzazione"
          className={style.inputField}
        />
      </div>

      <div className={style.buttonFilter}>
        <button type="submit" className={style.submitButton}>Cerca</button>
      </div>
    </form>
  );
}
