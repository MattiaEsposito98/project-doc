import { useContext, useState } from "react";
import style from "./About.module.css"
import { GlobalContext } from "../context/GlobalContext";

export default function About() {
  const { doctors } = useContext(GlobalContext)

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Invio in corso...");

    try {
      const response = await fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("Email inviata con successo!");
        setFormData({ email: "", subject: "", message: "" });
        setTimeout(() =>
          setStatus(""), 3000)
      } else {
        setStatus("Errore nell'invio dell'email.");
      }
    } catch (error) {
      console.error("Errore:", error);
      setStatus("Errore di connessione al server.");
    }
  };

  return (
    <div className={style.containerEmail}>
      <h2 className={style.title}>Invia un'email</h2>
      <form className={style.formEmail} onSubmit={handleSubmit} >
        <label className={style.label}>
          Invia un'email ai dottori presenti
          <select name="email" onChange={handleChange} value={formData.email} required>
            <option value="">Seleziona un dottore</option>
            {doctors.map(doctor => (
              <option key={doctor.ID_medico} value={doctor.Email}>
                {doctor.Email}
              </option>
            ))}
          </select>
        </label>

        <label className={style.label}>
          Oggetto
          <input
            type="text"
            name="subject"
            placeholder="Oggetto"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>

        <label className={style.label}>
          Messaggio
          <textarea
            name="message"
            placeholder="Messaggio"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>

        <button className="buttonNavigate" type="submit">Invia Email</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

