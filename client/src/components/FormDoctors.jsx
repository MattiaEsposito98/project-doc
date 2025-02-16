import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "./FormDoctors.module.css";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

const initialFormData = {
  Nome: "",
  Cognome: "",
  Email: "",
  Telefono: "",
  Indirizzo: "",
  Specializzazione: "",
};

export default function FormDoctors() {
  const [formData, setFormData] = useState(initialFormData);
  const { fetchDoctors } = useContext(GlobalContext)
  const navigate = useNavigate()

  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}register`, formData)

      .then((response) => {
        console.log("Dati inviati correttamente:", response.data);
        alert("Dati inviati correttamente!");
        setFormData(initialFormData);
        setTimeout(() => {
          fetchDoctors();
        }, 500);
        navigate('/')
      })

      .catch((error) => {
        console.error("Errore durante l'invio dei dati", error);
        alert("Si è verificato un errore");
      });
  }

  return (
    <>
      <h1 className={style.title} >Registrati nella piattaforma!</h1>
      <form className={style.formDoctors} onSubmit={handleSubmit}>
        {/* Nome */}
        <div className={style.label}>
          <label htmlFor="Nome">Inserisci il nome</label>
          <input
            type="text"
            id="Nome"
            name="Nome"
            value={formData.Nome}
            onChange={handleFormData}
            required
          />
        </div>

        {/* Cognome */}
        <div className={style.label}>
          <label htmlFor="Cognome">Inserisci il cognome</label>
          <input
            type="text"
            id="Cognome"
            name="Cognome"
            value={formData.Cognome}
            onChange={handleFormData}
            required
          />
        </div>

        {/* Email */}
        <div className={style.label}>
          <label htmlFor="Email">Inserisci l'email</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleFormData}
            required
          />
        </div>

        {/* Numero di telefono */}
        <div className={style.label}>
          <label htmlFor="Telefono">Inserisci il numero di telefono</label>
          <input
            type="number"
            id="Telefono"
            name="Telefono"
            pattern="^[0-9\- ]{10,20}$"
            value={formData.Telefono}
            onChange={handleFormData}
            required
          />
        </div>

        {/* Indirizzo */}
        <div className={style.label}>
          <label htmlFor="Indirizzo">Inserisci l'indirizzo dello studio</label>
          <input
            type="text"
            id="Indirizzo"
            name="Indirizzo"
            value={formData.Indirizzo}
            onChange={handleFormData}
            required
          />
        </div>

        {/* Specializzazione */}
        <div className={style.label}>
          <label htmlFor="Specializzazione">Inserisci la tua Specializzazione</label>
          <input
            type="text"
            id="Specializzazione"
            name="Specializzazione"
            value={formData.Specializzazione}
            onChange={handleFormData}
            required
          />
        </div>

        <button className={style.buttonForm} type="submit">
          Registrati
        </button>
      </form>
    </>
  );
}
