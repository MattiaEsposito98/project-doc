import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import style from "./Login.module.css"

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [logout, setLogout] = useState('')
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  function quit() {
    localStorage.removeItem("isAdmin");
    navigate('/login  ')
  }

  function handleLogin(e) {
    e.preventDefault();
    setError('');

    axios.post(`http://localhost:3000/api/login`, { username, password })
      .then(res => {
        console.log('Dati corretti:', res.data);
        localStorage.setItem("isAdmin", "true"); // Salviamo lo stato di login
        navigate("/"); // Reindirizza alla dashboard
      })
      .catch(err => {
        console.error('Username o password sbagliati', err);
        setError("Username o password sbagliati");
      });
  }

  return (
    <>
      <div className={style.containerLogin}>
        <h2 className={style.title}>Login Admin</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!isAdmin && (
          <form className={style.formLogin} onSubmit={handleLogin}>
            <div className={style.label}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={style.label}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={style.buttonLogin} type="submit">Accedi</button>
          </form>
        )}
        {isAdmin && <button className="buttonNavigate" onClick={quit}>Logout</button>}
      </div>
    </>
  );
}
