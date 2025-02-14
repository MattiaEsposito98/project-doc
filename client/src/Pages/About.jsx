import { useState } from "react";
import style from "./About.module.css"

export default function About() {

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
      <h2>Invia un'email</h2>
      <form className={style.formEmail} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email destinatario"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Oggetto"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Messaggio"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button className="buttonNavigate" type="submit">Invia Email</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

