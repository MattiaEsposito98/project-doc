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
            <Link to="/contact">
              Contact
            </Link>
          </li>

          <li className={style.buttonNavbar}>
            <Link to="/about">About
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}