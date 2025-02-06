import Icon from "../assets/Icon-doctor.jpg";
import style from "./Card.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Stars from "./Stars";
import { useState, useEffect } from "react";

export default function Card({ doctor }) {
  const [recensione, setRecensione] = useState(doctor.valutazione);

  return (
    <div className="container">
      <div className={style.card}>
        <figure>
          <img src={Icon} className={style.img} alt="" />
        </figure>
        <div className={style.cardDetails}>
          <h4>{doctor.Nome} {doctor.Cognome}</h4>
          <p>{doctor.Email}</p>
          <p className={style.numberPhone}>
            <FontAwesomeIcon icon={faPhone} /> {doctor.Telefono}
          </p>
          <p>{doctor.Specializzazione}</p>
          <p>
            {recensione === 0 || recensione === '0.0000' ? 'Nessuna recensione' : <Stars valutazione={recensione} />}
          </p>
          <Link to={`/Details/${doctor.ID_medico}`}>
            <button className={style.button}>Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
