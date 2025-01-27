import Icon from "../assets/Icon-doctor.jpg"
import style from "./Card.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function Card({ doctor }) {
  return (
    <>

      <div>
        <div className={style.card}>
          <figure>
            <img src={Icon} className={style.img} alt="" />
          </figure>
          <div className={style.cardDetails}>
            <h4>{doctor.Nome} {doctor.Cognome}</h4>
            <p>{doctor.Email}</p>
            <p className={style.numberPhone}> <FontAwesomeIcon icon={faPhone} /> {doctor.Telefono}</p>
            <p>{doctor.Specializzazione}</p>
            <p>{doctor.valutazione}</p>
            <Link to={`/Details/${doctor.ID_medico}`} >
              <button className={style.button}>Info</button>
            </Link>
          </div>

        </div>
      </div>

    </>
  )

} 