import style from "./Navbar.module.css"
import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <>
      <nav >
        <ul className={style.nav}>
          <li>
            <NavLink to="/">Home
            </NavLink>
          </li>

          <li>
            contact
          </li>

          <li>
            <Link to="/about">About
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}