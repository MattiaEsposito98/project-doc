import { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./FormReview.module.css"

const initialFormData = {
  name: '',
  Valutazione: '',
  Descrizione: ''
};

export default function FormReview({ onReviewSubmitted }) {
  const [formData, setFormData] = useState(initialFormData);
  const { id } = useParams();

  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Invia i dati
    axios.post(`http://localhost:3000/api/doctors/${id}`, { ...formData })
      .then(response => {
        console.log("Dati inviati correttamente:", response.data);
        alert("Dati inviati correttamente!");

        // Notifica al componente `Details` di aggiornare i dati del dottore
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }

        setFormData(initialFormData);
      })
      .catch(error => {
        console.error("Errore durante l'invio dei dati:", error);
        if (error.response) {
          alert(`Errore: ${error.response.data.message}`);
        } else {
          alert("Si è verificato un errore. Riprova più tardi.");
        }
      });
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.labelInput}>
        <label htmlFor="name">Inserisci il nome</label>
        <input type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleFormData}
          required
        />
      </div>

      <div className={style.labelInput}>
        <label htmlFor="Valutazione">Inserisci una Valutazione</label>
        <input type="number"
          id="Valutazione"
          name="Valutazione"
          value={formData.Valutazione}
          onChange={handleFormData}
          required
          min="1"
          max="5"
        />
      </div>

      <div className={style.labelInput}>
        <label htmlFor="Descrizione">Inserisci una Descrizione</label>
        <textarea type="text"
          id="Descrizione"
          name="Descrizione"
          value={formData.Descrizione}
          onChange={handleFormData}
          required
          maxLength="100"
        />
      </div>

      <button className={style.buttonForm} type="submit">Invia Recensione</button>
    </form>
  );
}
