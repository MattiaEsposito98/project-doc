import style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <>
      <nav >
        <ul className={style.nav}>
          <li>
            Home
          </li>
          <li>
            Contact
          </li>
          <li>
            About
          </li>
        </ul>
      </nav>
    </>
  )
}