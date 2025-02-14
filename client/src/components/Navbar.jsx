import style from "./Navbar.module.css"
import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <>
      <nav >
        <ul className={style.nav}>
          <li className={style.buttonNavbar}>
            <NavLink to="/">Home
            </NavLink>
          </li>

          <li className={style.buttonNavbar}>
            <Link to="/register">
              Registrati
            </Link>
          </li>

          <li className={style.buttonNavbar}>
            <Link to="/about">Contattatci
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}