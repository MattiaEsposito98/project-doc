import style from "./FormDoctor.module.css"
export default function FormDoctors() {
  return (
    <>
      <form className={style.formDoctors}>
        {/* Nome */}
        <div className={style.label}>
          <label htmlFor="name">Inserisci il nome</label>
          <input
            type="text"
            id="name"
            name="name"
            required />
        </div>

        {/* Cognome */}
        <div className={style.label}>
          <label htmlFor="cognome">Inserisci il cognome</label>
          <input
            type="text"
            id="cognome"
            name="cognome"
            required />
        </div>

        {/* Email */}
        <div className={style.label}>
          <label htmlFor="email">Inserisci l'email</label>
          <input
            type="email"
            id="email"
            name="email"
            required />
        </div>

        {/* Numero di telefono */}
        <div className={style.label}>
          <label htmlFor="telefono">Inserisci il numero di telefono</label>
          <input
            type="number"
            id="telefono"
            name="telefono"
            pattern="^[0-9\- ]{10,20}$"
            required />
        </div>

        {/* Indirizzo */}
        <div className={style.label}>
          <label htmlFor="indirizzo">Inserisci l'indirizzo dello studio</label>
          <input
            type="text"
            id="indirizzo"
            name="indirizzo"
            required />
        </div>

        {/* Specializzazione */}
        <div className={style.label}>
          <label htmlFor="specializzazione">Inserisci la tua Specializzazione</label>
          <input
            type="text"
            id="specializzazione"
            name="specializzazione"
            required />
        </div>

        <button className={style.buttonForm} type="submit">Registrati</button>

      </form>
    </>
  )
}